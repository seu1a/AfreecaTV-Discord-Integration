import { app } from "electron";
import dotenv from "dotenv";

import RPCHandler from "./rpc";
import HTTPServer from "./server";
import MenuBar from "./tray";

dotenv.config();

const Server = new HTTPServer();

const appElements: any = {
  tray: null,
  windows: [],
};

app.on("ready", () => {
  appElements.tray = new MenuBar();

  Server.start(process.env.PORT ? Number(process.env.PORT) : 3000, () => {
    RPCHandler.connnect();
  });
});
