import { Client } from "@xhayper/discord-rpc";
import "dotenv/config";
import ActivityBody from "./request";
import * as Ready from "./ready";

class RPCHandler {
  private static client: Client;

  public static async connnect() {
    RPCHandler.client = new Client({
      clientId: process.env.CLIENT_ID ?? "1275040244995067914",
    });

    RPCHandler.client.once("ready", async () => {
      Ready.setReady(true);
    });

    RPCHandler.client.login().catch(() => {
      RPCHandler.client.destroy();
    });
  }

  public static async reconnect() {
    RPCHandler.destroy();
    RPCHandler.connnect();
  }

  public static async setActivity(activity: ActivityBody) {
    await RPCHandler.client.user?.setActivity({
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

  public static async clearActivity() {
    await RPCHandler.client.user?.clearActivity();
  }

  public static async destroy(): Promise<void> {
    Ready.setReady(false);
    await RPCHandler.client.user?.clearActivity();
    await RPCHandler.client.destroy();
  }
}

export default RPCHandler;
