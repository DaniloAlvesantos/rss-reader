import z from "zod";
import type { SubscriptionService } from "../services/SubscriptionService";
import type { DefaultControllerProps } from "../types/defaultControllerProps";

class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  public getAllSubscriptions = async ({ req, res }: DefaultControllerProps) => {
    try {
      const subscriptions = await this.subscriptionService.fetchAll();

      return res.json({ subscriptions });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  public createSubscription = async ({ req, res }: DefaultControllerProps) => {
    const schema = z.object({
      url: z.url({
        protocol: /^https?$/,
        error: "Invalid URL",
      }),
      interval: z.number().min(10),
    });

    const { interval, url } = schema.parse(req.body);

    try {
      const subscription = await this.subscriptionService.create(url, interval);

      if (!subscription) {
        return res.status(400).json({ error: "Invalid URL" });
      }

      return res.status(201).json({ subscription });
    } catch (err) {
      console.error(err);
    }
  };

  public joinSubscription = async ({ req, res }: DefaultControllerProps) => {
    const schema = z.object({
      url: z.url({
        protocol: /^https?$/,
        error: "Invalid URL",
      }),
    });

    const { url } = schema.parse(req.body);

    try {
      const subscription = await this.subscriptionService.join(
        url,
        req.user.id,
      );

      if (!subscription) {
        return res.status(400).json({ error: "Invalid URL" });
      }

      return res.status(201).json({ subscription });
    } catch (err) {
      console.error(err);
    }
  };
}

export { SubscriptionController };
