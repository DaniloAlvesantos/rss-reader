import express, { type Application } from "express";
import http from "node:http";
import { UserRoute } from "../routes/UserRoute";

class Server {
  private http: http.Server;
  private app: Application;
  private readonly port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.http = http.createServer(this.app);
  }

  configureMiddlewares(): void {
    this.app.use(express.json());
  }

  configureRoutes(): void {
    this.app.use(new UserRoute().router);
  }

  public start(): void {
    this.configureMiddlewares();
    this.configureRoutes();

    this.http.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export { Server };
