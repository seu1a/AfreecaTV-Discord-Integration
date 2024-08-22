import { Client } from "@xhayper/discord-rpc";
import "dotenv/config";
import ActivityBody from "./request";
import * as Ready from "./ready";

interface RPCInterface {
  setActivity(activity: object): void;
  clearActivity(): void;
  destroy(): void;
}

class RPCHandler implements RPCInterface {
  private client: Client;

  constructor() {
    this.client = new Client({
      clientId: process.env.CLIENT_ID ?? "1275040244995067914",
    });

    this.client.once("ready", async () => {
      Ready.setReady(true);
    });

    this.client.login().catch(() => {
      this.client.destroy();
    });
  }

  public async setActivity(activity: ActivityBody): Promise<void> {
    await this.client.user?.setActivity({
      details: `${activity.nickname} · ${activity.view}명 · 📺`,
      state: `💫 · ${activity.title}`,
      largeImageKey: `${activity.image}`,
      smallImageKey: "afreecatv-logo-transparent",
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

  public async destroy(): Promise<void> {
    Ready.setReady(false);
    await this.client.user?.clearActivity();
    await this.client.destroy();
  }
}

export default RPCHandler;
