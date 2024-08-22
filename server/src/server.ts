import { IncomingMessage, ServerResponse } from "http";
import RPCHandler from "./rpc";
import http from "http";
import ActivityBody from "./request";
import * as Ready from "./ready";

interface ServerInterface {
  setCORS(res: ServerResponse): void;
  parseBody(req: IncomingMessage): Promise<ActivityBody>;
  requestHandler(req: IncomingMessage, res: ServerResponse): void;
  start(port: number, callback: () => void): void;
}

class HTTPServer implements ServerInterface {
  private Server: http.Server;

  constructor() {
    this.requestHandler = this.requestHandler.bind(this);
    this.Server = http.createServer(this.requestHandler);
  }

  public async setCORS(res: ServerResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
  }

  public async parseBody(req: IncomingMessage): Promise<ActivityBody> {
    return new Promise((resolve, reject) => {
      let requestBody = "";

      req.on("data", (chunk) => {
        requestBody += chunk;
      });

      req.on("end", () => {
        try {
          const parsedBody: ActivityBody = JSON.parse(requestBody);
          resolve(parsedBody);
        } catch (error) {
          reject(error);
        }
      });

      req.on("error", (error) => {
        reject(error);
      });
    });
  }

  public async requestHandler(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    this.setCORS(res);
    if (!Ready.getReady()) {
      await RPCHandler.reconnect();
    }

    if (req.url === "/" && req.method === "POST") {
      let body = await this.parseBody(req);
      await RPCHandler.setActivity(body);
      res.end("OK");
    } else if (req.url === "/clear" && req.method === "POST") {
      await RPCHandler.clearActivity();
      res.end("OK");
    } else {
      res.end("Not Found");
    }
  }

  public start(port: number, callback: () => void) {
    this.Server.listen(port, callback);
  }
}

export default HTTPServer;
