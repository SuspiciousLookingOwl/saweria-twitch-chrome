export interface TwitchClientOptions {
	botName: string;
	botToken: string;
	channelName: string;
	messageTemplate: string;
	debug?: boolean;
}

export interface Settings {
	channelName: string;
	botName: string;
	botToken: string;
	messageTemplate: string;
}

export interface Donation {
	donator: string;
	amount: number;
	message: string;
}

// TODO: fix this typing
export type Event =
	| {
			name: "connect";
			data: undefined;
	  }
	| {
			name: "disconnect";
			data: undefined;
	  }
	| {
			name: "donation";
			data: Donation;
	  }
	| {
			name: "saveSettings";
			data: Settings;
	  };

export type State = {
	isTwitchConnected: boolean;
	isTwitchConnecting: boolean;
	isSaweriaConnected: boolean;
	isSaweriaTabExists: boolean;
};
