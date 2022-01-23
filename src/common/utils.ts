import { Donation } from "./interfaces";

export const thousandSeparate = (x: number, separator = ".") => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

export const resolveMessage = (messageTemplate: string, donation: Donation): string => {
	const message = messageTemplate.replace(/(\{donator})|(\{amount})|(\{message})/g, (p) => {
		const placeholder = p.slice(1, -1);
		if (placeholder === "donator") return donation.donator;
		if (placeholder === "amount") return thousandSeparate(donation.amount);
		if (placeholder === "message") return donation.message;
		return "";
	});
	return message;
};

export const getValidTabs = async () => {
	const tabs = await chrome.tabs.query({});
	return tabs.filter((tab) => {
		if (!tab.url) return false;
		try {
			const { hostname, pathname, searchParams } = new URL(tab.url);
			return hostname === "saweria.co" && pathname === "/overlays/alert" && searchParams.get("streamKey");
		} catch {
			// not a valid url
			return false;
		}
	});
};
