export const connectWebSocket = (extensionId: string) => {
	const connect = () => {
		const params = new URLSearchParams(window.location.search);
		const streamKey = params.get("streamKey");
		const client = new WebSocket(`wss://events.saweria.co/stream?streamKey=${streamKey}`);
		let port = chrome.runtime.connect(extensionId);

		// to keep background service worker alive
		setInterval(() => {
			if (port) port.disconnect();
			port = chrome.runtime.connect(extensionId);
		}, 60 * 1000);

		client.onmessage = (message) => {
			const { data: donations } = JSON.parse(message.data);
			for (const donation of donations) {
				port.postMessage({ name: "donation", data: donation });
			}
		};

		client.onclose = () => setTimeout(connect, 1000);
		client.onerror = () => client.close();
	};

	connect();
};
