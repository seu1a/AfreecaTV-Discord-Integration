import { Client } from "@xhayper/discord-rpc";

interface RPCInterface {
  client: Client;
  setActivity(activity: object): void;
  setDefaultActivity(): void;
}

class RPCHandler implements RPCInterface {
  public client: Client;

  constructor() {
    this.client = new Client({
      clientId: "1275040244995067914",
    });
  }

  public setActivity(activity: object) {
    this.client.user?.setActivity(activity);
  }

  public setDefaultActivity(): void {
    this.client.user?.setActivity({
      details: "details",
      state: "state",
      largeImageKey: "afreeca",
      type: 3,
    });
  }
}

export default RPCHandler;
