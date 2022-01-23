import classNames from "classnames";
import { Component, For, JSXElement } from "solid-js";
import { useHash } from "../hooks";
import Icon from "./Icon";

type ItemProps = {
	icon: JSXElement;
	label: string;
	href: string;
	isActive: boolean;
};

const Item: Component<ItemProps> = (p) => {
	return (
		<a
			href={p.href}
			class={classNames("flex cursor-pointer transition-colors", {
				"bg-neutral-500": p.isActive,
				"hover:bg-neutral-600": !p.isActive,
			})}
		>
			<div
				class={classNames(
					"m-auto flex flex-col space-y-0.5",
					{ "!fill-white": p.isActive },
					{ "!fill-neutral-500": !p.isActive }
				)}
			>
				{p.icon}
				<div class="text-sm">{p.label}</div>
			</div>
		</a>
	);
};

const BottomNavigation: Component = () => {
	const hash = useHash();

	const items = [
		{
			icon: <Icon.Home class="h-5" />,
			label: "Home",
			href: "#",
		},
		{
			icon: <Icon.PriceList class="h-5" />,
			label: "Donations",
			href: "#donations",
		},
		{
			icon: <Icon.Gear class="h-5" />,
			label: "Settings",
			href: "#settings",
		},
		{
			icon: <Icon.QuestionMark class="h-5" />,
			label: "About",
			href: "#about",
		},
	];

	return (
		<div class="grid grid-flow-col auto-cols-fr h-14 divide-x divide-neutral-600 bg-neutral-700">
			<For each={items}>{(i) => <Item {...i} isActive={i.href === hash()} />}</For>
		</div>
	);
};

export default BottomNavigation;
