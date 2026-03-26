import { Router } from "express";

class UserRoute {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/", (req, res) => {});
  }
}

export { UserRoute };
