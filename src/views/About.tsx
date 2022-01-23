import { Component, JSX } from "solid-js";
import { Divider } from "../components";

const ListItem: Component<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...p }) => {
	return (
		<a class="flex flex-col justify-center text-base bg-neutral-700 hover:bg-neutral-600 h-12 w-full p-2" {...p}>
			{children}
		</a>
	);
};

const AboutView: Component = () => {
	return (
		<div class="px-2 py-4">
			<div class="text-xl">About</div>
			<Divider />
			<div class="py-4 divide-y divide-neutral-500">
				<ListItem href="#help">How To Use</ListItem>
				<ListItem href="https://github.com/SuspiciousLookingOwl/saweria-twitch-chrome" target="_blank">
					GitHub
				</ListItem>
				<ListItem href="https://saweria.co/suspiowl" target="_blank">
					Donate
				</ListItem>
			</div>

			<div class="text-xs">
				This is an unofficial extension made by community, and not affiliated with Saweria or Twitch in any way.
			</div>
		</div>
	);
};

export default AboutView;
