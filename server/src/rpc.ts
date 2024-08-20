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

  public async setActivity(activity: ActivityBody): Promise<void> {
    await this.client.user?.setActivity({
      details: `${activity.nickname} · ${activity.view}명 · 📺`,
      state: `💫 · ${activity.title}`,
      largeImageKey: `${activity.image}`,
      smallImageKey: "afreeca",
      smallImageText: "AfreecaTV",
      type: 3,
      buttons: [
        {
          label: "방송 보러가기",
          url: "https://www.afreecatv.com/",
        },
        {
          label: "방송 보러가기",
          url: "https://www.afreecatv.com/",
        },
      ],
    });
  }

  public async setDefaultActivity(): Promise<void> {
    await this.client.user?.setActivity({
      details: "details",
      state: "state",
      largeImageKey: "afreeca",
      type: 3,
    });
  }
}

export default RPCHandler;
