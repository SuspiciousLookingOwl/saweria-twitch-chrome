import { createSignal } from "solid-js";

export const useHash = () => {
	const [hash, setHash] = createSignal(window.location.hash || "#");

	window.addEventListener("hashchange", () => {
		setHash(window.location.hash || "#");
	});

	return hash;
};
