import RPCHandler from "./rpc";
import HTTPServer from "./server";

const RPC = new RPCHandler();
const Server = new HTTPServer(RPC);

Server.start(3000, () => {
  try {
    RPC.client.on("ready", async () => {
      Server.setReady();
    });
  } catch (e) {
    console.error(e);
  }

  RPC.client.login();

  console.log("Server is listening on port 3000");
});
