import express, { type Application } from "express";
import http from "node:http";
import { UserRouter } from "../routes/UserRoute";
import { FirebaseLib } from "../lib/FirebaseLib";

class Server {
  private http: http.Server;
  private app: Application;
  private readonly port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.http = http.createServer(this.app);
  }

  private initializeInfrastructure(): void {
    FirebaseLib.init();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
  }

  private configureRoutes(): void {
    this.app.use("/user", new UserRouter().router);
  }

  public start(): void {
    this.initializeInfrastructure();
    this.configureMiddlewares();
    this.configureRoutes();

    this.http.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export { Server };
