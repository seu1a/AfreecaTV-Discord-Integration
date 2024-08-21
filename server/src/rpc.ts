import { Client } from "@xhayper/discord-rpc";
import "dotenv/config";
import ActivityBody from "./request/ActivityBody";

interface RPCInterface {
  client: Client;
  setActivity(activity: object): void;
}

class RPCHandler implements RPCInterface {
  public client: Client;

  constructor() {
    this.client = new Client({
      clientId: process.env.CLIENT_ID ?? "1275040244995067914",
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
          label: "👋 같이 보기 ~ !",
          url: `${activity.url}`,
        },
      ],
    });
  }

  public async clearActivity(): Promise<void> {
    await this.client.user?.clearActivity();
  }
}

export default RPCHandler;
