import { IncomingMessage, ServerResponse } from "http";
import RPCHandler from "./rpc";
import http from "http";
import ActivityBody from "./request/ActivityBody";

interface ServerInterface {
  setReady(): void;
  isReady(res: ServerResponse): void;
  requestHandler(req: IncomingMessage, res: ServerResponse): void;
  start(port: number, callback: () => void): void;
}

class HTTPServer implements ServerInterface {
  private RPC: RPCHandler;
  private ready = false;
  private server: http.Server;

  constructor(RPC: RPCHandler) {
    this.RPC = RPC;
    this.requestHandler = this.requestHandler.bind(this);
    this.server = http.createServer(this.requestHandler);
  }

  public setReady(): void {
    this.ready = true;
  }

  public isReady(res: ServerResponse): boolean {
    if (!this.ready) {
      res.end("Server is not ready");
      return false;
    }

    return true;
  }

  public setCORS(res: ServerResponse): void {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
  }

  public parseBody(req: IncomingMessage): Promise<ActivityBody> {
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

    this.isReady(res);

    if (req.url === "/" && req.method === "GET") {
      this.RPC.setDefaultActivity();
      res.end("ok");
    } else if (req.url === "/" && req.method === "POST") {
      let body = await this.parseBody(req);
      this.RPC.setActivity(body);
      res.end("ok");
    } else {
      res.end("Not Found");
    }
  }

  public start(port: number, callback: () => void) {
    this.server.listen(port, callback);
  }
}

export default HTTPServer;
