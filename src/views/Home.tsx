import classNames from "classnames";
import { Component, createMemo, createSignal, onMount } from "solid-js";
import { State } from "../common/interfaces";
import { Divider } from "../components";

const HomeView: Component = () => {
	const [state, setState] = createSignal<State>({
		isSaweriaTabExists: false,
		isTwitchConnecting: false,
		isTwitchConnected: false,
		isSaweriaConnected: false,
	});

	onMount(async () => {
		chrome.runtime?.connect();
		chrome.runtime?.onMessage.addListener(({ name, data }) => {
			if (name === "stateUpdate") setState(data);
		});
	});

	const isButtonDisabled = createMemo(() => {
		return (state().isTwitchConnecting || !state().isSaweriaTabExists) && !state().isTwitchConnected;
	});

	const buttonClass = createMemo(() => {
		return classNames("border-2 rounded-lg px-8 py-4 text-3xl hover:shadow-md", {
			"border-neutral-500 text-neutral-500": isButtonDisabled(),
			"border-yellow-400 text-yellow-200  hover:shadow-yellow-400/25":
				!isButtonDisabled() && !state().isTwitchConnected,
			"border-green-400 text-green-200 hover:shadow-green-400/25": state().isTwitchConnected,
		});
	});

	const connect = () => {
		chrome.runtime.sendMessage({ name: !state().isTwitchConnected ? "connect" : "disconnect" });
	};

	return (
		<div class="h-full p-4">
			<div class="text-center space-x-2">
				<span class="text-brand-saweria font-brand-saweria font-bold lowercase  text-3xl">Saweria</span>
				<span class="text-brand-twitch font-brand-twitch text-2xl">Twitch</span>
				<span class="uppercase text-lg">Bot</span>
			</div>

			<Divider />

			<div class="w-full absolute top-1/2 px-4 left-0 text-center -mt-14">
				<button disabled={isButtonDisabled()} class={buttonClass()} onClick={connect}>
					{state().isTwitchConnected ? "Disconnect" : "Connect"}
				</button>

				<div class="flex flex-col py-2 text-sm space-y-1 text-center">
					{!state().isSaweriaTabExists && (
						<div class="text-red-500">Saweria Tab Not Found! Open a Saweria Alert page on your browser</div>
					)}
					<div>
						Status:{" "}
						{state().isTwitchConnected
							? "Connected"
							: state().isTwitchConnecting
							? "Connecting"
							: "Disconnected"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeView;
