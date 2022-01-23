import { Component } from "solid-js";
import { BottomNavigation } from "./components";
import { Routes } from "./views/Routes";

const App: Component = () => {
	return (
		<div class="flex">
			<div class="flex flex-col relative min-w-[24rem] w-full h-[32rem] bg-neutral-800 pb-14 ">
				<div class="flex-grow overflow-y-auto">
					<Routes />
				</div>

				<div class="w-full bottom-0 absolute">
					<BottomNavigation />
				</div>
			</div>
		</div>
	);
};

export default App;
