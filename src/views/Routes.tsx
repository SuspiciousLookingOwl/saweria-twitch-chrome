import { Component, createMemo } from "solid-js";
import { useHash } from "../hooks";
import AboutView from "./About";
import DonationsView from "./Donations";
import HelpView from "./Help";
import HomeView from "./Home";
import SettingsView from "./Settings";

export const routes = [
	{
		path: "#",
		component: <HomeView />,
	},
	{
		path: "#donations",
		component: <DonationsView />,
	},
	{
		path: "#settings",
		component: <SettingsView />,
	},
	{
		path: "#about",
		component: <AboutView />,
	},
	{
		path: "#help",
		component: <HelpView />,
	},
];

export const Routes: Component = () => {
	const hash = useHash();

	const Component = createMemo(() => {
		const route = routes.find((route) => route.path === hash());
		return () => (route || routes[0]).component;
	}, routes[0].component);

	return <>{Component()}</>;
};
