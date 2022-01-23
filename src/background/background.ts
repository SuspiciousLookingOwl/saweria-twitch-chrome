import tmi from "tmi.js";
import { Donation, Event, State, TwitchClientOptions } from "../common/interfaces";
import { getValidTabs, resolveMessage } from "../common/utils";
import { connectWebSocket } from "./injector";

let tmiClient: tmi.Client | undefined;
let activeTab: chrome.tabs.Tab | undefined;
let state: State = {
	isTwitchConnected: false,
	isTwitchConnecting: false,
	isSaweriaConnected: false,
	isSaweriaTabExists: false,
};

const updateActiveTab = async () => {
	const tabs = await getValidTabs();
	const activeTabExists = !!tabs.find((t) => t.id === activeTab?.id);
	if (!activeTabExists) {
		updateState({ isSaweriaConnected: false });
		activeTab = tabs.shift();
		if (activeTab) connectSaweria();
	}
	updateState({ isSaweriaTabExists: !!activeTab?.id });
};

const updateState = (newState: Partial<State> = {}) => {
	state = { ...state, ...newState };
	chrome.runtime.sendMessage({ name: "stateUpdate", data: state });
};

const connectTwitch = async (options: TwitchClientOptions) => {
	if (state.isTwitchConnecting || !activeTab?.id) return;

	updateState({ isTwitchConnecting: true });

	// run twitch client
	if (tmiClient?.readyState() === "OPEN") {
		return updateState({
			isTwitchConnected: true,
			isTwitchConnecting: false,
		});
	}

	const { debug, channelName, botName, botToken } = options;
	tmiClient = new tmi.Client({
		options: { debug },
		connection: {
			secure: true,
			reconnect: true,
		},
		identity: {
			username: botName,
			password: botToken,
		},
		channels: [channelName],
	});

	tmiClient.on("connected", () => {
		updateState({
			isTwitchConnected: true,
			isTwitchConnecting: false,
		});
	});

	tmiClient.on("disconnected", () => {
		updateState({
			isTwitchConnected: false,
			isTwitchConnecting: false,
		});
	});

	tmiClient.connect();
	connectSaweria();
};

const connectSaweria = () => {
	if (!activeTab?.id || state.isSaweriaConnected) return;

	chrome.tabs.update(activeTab.id, { muted: true });
	chrome.scripting.executeScript({
		target: { tabId: activeTab.id },
		func: connectWebSocket,
		args: [chrome.runtime.id],
	});
	updateState({ isSaweriaConnected: true });
};

const onMessage = async ({ name, data }: Event, port: chrome.runtime.Port) => {
	const { settings } = await chrome.storage.local.get(["settings"]);

	switch (name) {
		case "connect":
			connectTwitch(settings);
			break;
		case "disconnect":
			await tmiClient?.disconnect();
			tmiClient?.removeAllListeners();
			port.postMessage({ name: "disconnected" });
			break;
		case "donation":
			if (tmiClient?.readyState() !== "OPEN") return;
			tmiClient?.say(settings.channelName, resolveMessage(settings.messageTemplate, data as Donation));
			break;
		case "saveSettings":
			await tmiClient?.disconnect();
			await connectTwitch(settings);
			break;
	}
};

const onRuntimeConnected = async (port: chrome.runtime.Port) => {
	await updateActiveTab();
	chrome.runtime.onMessage.addListener((d) => onMessage(d, port));
	port.onMessage.addListener((d) => onMessage(d, port));
};

chrome.tabs.onUpdated.addListener(updateActiveTab);
chrome.tabs.onCreated.addListener(updateActiveTab);
chrome.tabs.onRemoved.addListener(updateActiveTab);
chrome.runtime.onConnect.addListener(onRuntimeConnected);
