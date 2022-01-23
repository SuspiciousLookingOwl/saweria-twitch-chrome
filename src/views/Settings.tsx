import { Component, createMemo, createSignal, onMount } from "solid-js";
import { Settings } from "../common/interfaces";
import { resolveMessage } from "../common/utils";
import { Divider, Input, TextArea } from "../components";

const SettingsView: Component = () => {
	const [currentSettings, setCurrentSettings] = createSignal<Settings>({
		channelName: "",
		botName: "",
		botToken: "",
		messageTemplate: "Thank you {donator} for your donation of {amount}! {message}",
	});

	const [channelName, setChannelName] = createSignal("");
	const [botName, setBotName] = createSignal("");
	const [botToken, setBotToken] = createSignal("");
	const [messageTemplate, setMessageTemplate] = createSignal(
		"Thank you {donator} for your donation of {amount}! {message}"
	);

	onMount(async () => {
		const { settings } = (await chrome.storage.local.get(["settings"])) as { settings: Settings | undefined };

		if (settings) setCurrentSettings(settings);
		else await chrome.storage.local.set({ settings: currentSettings() });
		reset();
		chrome.runtime?.connect();
	});

	const isChanged = createMemo(() => {
		return (
			currentSettings().botName !== botName() ||
			currentSettings().botToken !== botToken() ||
			currentSettings().channelName !== channelName() ||
			currentSettings().messageTemplate !== messageTemplate()
		);
	});

	const reset = () => {
		setChannelName(currentSettings().channelName);
		setBotName(currentSettings().botName);
		setBotToken(currentSettings().botToken);
		setMessageTemplate(currentSettings().messageTemplate);
	};

	const saveSettings = () => {
		setCurrentSettings({
			channelName: channelName(),
			botName: botName(),
			botToken: botToken(),
			messageTemplate: messageTemplate(),
		});
		chrome.storage.local.set({ settings: currentSettings() });
		chrome.runtime?.sendMessage({
			name: "saveSettings",
			data: currentSettings(),
		});
	};

	return (
		<div class="relative px-2 py-4 text-sm">
			{isChanged() && (
				<div class="fixed top-0 left-0 flex flex-row items-center w-full h-14 bg-green-600 text-white p-2 text-base">
					<div class="flex flex-col -space-y-0.5">
						<span>Changes Detected</span>
						<span class="text-xs underline cursor-pointer" onClick={reset}>
							Reset
						</span>
					</div>
					<div class="flex-grow " />
					<button class="border border-white hover:bg-green-500 rounded py-1 px-4" onClick={saveSettings}>
						Save
					</button>
				</div>
			)}

			<div class="text-xl">Settings</div>
			<Divider />
			<div class="flex flex-col space-y-6 py-4">
				<Input
					value={channelName()}
					onInput={(e) => setChannelName(e.currentTarget.value)}
					label="Twitch Channel Name"
					hint="Your own channel name. The bot will sends a message to this channel when a donation is received."
				/>

				<Input
					value={botName()}
					onInput={(e) => setBotName(e.currentTarget.value)}
					label="Twitch Bot Name"
					hint="Your bot channel name. You can put your Twitch channel name here if you are using your own Twitch account as the bot"
				/>

				<Input
					value={botToken()}
					onInput={(e) => setBotToken(e.currentTarget.value)}
					label="Twitch Bot OAuth Token"
					placeholder="oauth:xxxxx"
					hint={
						<>
							Get your Bot OAuth token from{" "}
							<a class="underline underline-offset-1" target="_blank" href="https://twitchapps.com/tmi/">
								here
							</a>
							, make sure to log in to the bot account first before you generate the token.
						</>
					}
					type="password"
				/>

				<TextArea
					value={messageTemplate()}
					onInput={(e) => setMessageTemplate(e.currentTarget.value)}
					label="Message Template"
					hint="Placeholders: {donator}, {amount}, {message}"
				/>

				<div class="flex flex-col space-y-1">
					<span>Donation Message Preview</span>
					<div class="text-sm bg-neutral-900 p-2 rounded">
						<span class="text-red-500 font-semibold">{botName() || "BotName"}</span>
						<span>
							:{" "}
							{resolveMessage(messageTemplate(), {
								amount: 69420,
								donator: "Someguy",
								message: "Testing 1 2 3 🤭",
							})}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingsView;
