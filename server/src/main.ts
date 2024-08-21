import RPCHandler from "./rpc";
import HTTPServer from "./server";
import dotenv from "dotenv";

dotenv.config();

const RPC = new RPCHandler();
const Server = new HTTPServer(RPC);

Server.start(Number(process.env.PORT) ?? 3000, () => {
  try {
    RPC.client.on("ready", async () => {
      Server.setReady();
    });
  } catch (e) {
    console.error(e);
  }

  RPC.client.login().catch((e) => {
    console.log(e);
  });

  console.log("Server is listening on port 3000");
});
