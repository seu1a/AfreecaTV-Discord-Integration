import http, { IncomingMessage, Server, ServerResponse } from "http";

import { Client } from "@xhayper/discord-rpc";

const rpc: Client = new Client({
  clientId: "1275040244995067914",
});

var ready = false;

const setActivity = async (activity: any) => {
  try {
    rpc.user?.setActivity(activity);
  } catch (e) {
    console.error(e);
  }
};

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  if (ready !== true) {
    res.write("fail");
    res.end();
    return;
  }

  if (req.url === "/") {
    setActivity({
      details: `booped times`,
      state: "in slither party",
      startTimestamp: Date.now(),
      largeImageKey: "afreeca",
      largeImageText: "아프리카TV",
      type: 3,
    });

    res.write("success");
    res.end();
  }
};

const server: Server = http.createServer(requestHandler);

server.listen(3000, () => {
  rpc.on("ready", async () => {
    ready = true;
  });

  rpc.login();

  console.log("Server is listening on port 3000");
});
