import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";

export class UserRouter {
  public router: Router = Router();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const userService = new UserService();
    const userController = new UserController(userService);

    this.router.get("/all", (req, res) =>
      userController.getAllUsers({ req, res }),
    );
    this.router.post("/create", (req, res) =>
      userController.createUser({ req, res }),
    );
    this.router.post("/login", (req, res) =>
      userController.login({ req, res }),
    );
    // this.router.get("/logout", (req, res) => );
  }
}
