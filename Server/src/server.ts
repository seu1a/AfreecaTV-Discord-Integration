import { IncomingMessage, ServerResponse } from "http";
import RPCHandler from "./rpc";
import http from "http";

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

  public setReady() {
    this.ready = true;
  }

  public isReady(res: ServerResponse) {
    if (!this.ready) {
      res.end("Server is not ready");
      return;
    }
  }

  public requestHandler(req: IncomingMessage, res: ServerResponse) {
    this.isReady(res);

    if (req.url === "/") {
      this.RPC.setDefaultActivity();
      res.end("ok");
    } else {
      res.end("404 Not Found");
    }
  }

  public start(port: number, callback: () => void) {
    this.server.listen(port, callback);
  }
}

export default HTTPServer;
