import { Client, SetActivityResponse } from "@xhayper/discord-rpc";
import "dotenv/config";
import ActivityBody from "./request/ActivityBody";

interface RPCInterface {
  client: Client;
  setActivity(activity: object): void;
  setDefaultActivity(): void;
}

class RPCHandler implements RPCInterface {
  public client: Client;

  constructor() {
    this.client = new Client({
      clientId: process.env.CLIENT_ID!,
    });
  }

  public setActivity(activity: ActivityBody): void {
    this.client.user?.setActivity({
      details: `${activity.title}`,
      state: `${activity.nickname} · ${activity.view}명`,
      largeImageKey: "afreeca",
      type: 3,
    });
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
