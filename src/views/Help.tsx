import { Component } from "solid-js";
import { Divider } from "../components";

const HelpView: Component = () => {
	return (
		<div class="px-2 py-4">
			<div class="text-xl">Settings</div>
			<Divider />
			<ol class="list-decimal px-4 py-2 space-y-2">
				<li>
					Configure your Twitch channel name, bot name, and bot token on the{" "}
					<a class="underline underline-offset-1" href="#settings">
						settings page
					</a>
					.<div>(further instructions are available on the settings page)</div>
				</li>
				<li>
					Open Saweria's alert overlay page by opening{" "}
					<a href="https://saweria.co/overlays" target="_blank" class="underline underline-offset-1">
						Saweria Overlays page
					</a>
					, and then clicking the "<i>Buka di tab baru</i>" button
				</li>
				<li>
					Go to{" "}
					<a href="#home" class="underline underline-offset-1">
						Home page
					</a>
					, and click the "<i>Connect</i>" button
				</li>
			</ol>
		</div>
	);
};

export default HelpView;
