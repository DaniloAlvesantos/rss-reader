import { Server } from "./Server";

const port = Number(process.env.PORT) || 3001;
const server = new Server(port);

server.start();
