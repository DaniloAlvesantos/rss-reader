import { Router } from "express";
import { SubscriptionService } from "../services/SubscriptionService";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { RSS } from "../utils/RSS";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

class SubscriptionRoute {
  public router: Router = Router();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const rss = new RSS();
    const subscriptionService = new SubscriptionService(rss);
    const subscriptionController = new SubscriptionController(
      subscriptionService,
    );

    this.router.get("/all", (req, res) => {
      subscriptionController.getAllSubscriptions({ req, res });
    });

    this.router.post("/create", AuthMiddleware.authenticate, (req, res) => {
      subscriptionController.createSubscription({ req, res });
    });

    this.router.post("/join", AuthMiddleware.authenticate, (req, res) => {
      subscriptionController.joinSubscription({ req, res });
    });
  }
}

export { SubscriptionRoute };
