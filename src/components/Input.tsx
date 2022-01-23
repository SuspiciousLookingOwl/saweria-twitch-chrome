import { Component, JSX } from "solid-js";

type InputProps = {
	label: string;
	hint?: string | JSX.Element;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

const Input: Component<InputProps> = (p) => {
	return (
		<div class="flex flex-col space-y-1">
			<div>{p.label}</div>
			<input class="p-2 border border-neutral-500 rounded bg-transparent w-full" {...p} />
			{p.hint && <div class="text-neutral-400 text-xs">{p.hint}</div>}
		</div>
	);
};

export default Input;
