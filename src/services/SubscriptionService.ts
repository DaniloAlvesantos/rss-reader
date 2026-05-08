import { Subscription } from "../models/Subscription";
import { prisma } from "../lib/prisma";
import axios from "axios";
import { RSS } from "../utils/RSS";
import { Validator } from "../utils/Validator";

class SubscriptionService {
  constructor(private rss: RSS) {}

  public async fetchAll(): Promise<Subscription[]> {
    const subscriptions = await prisma.subscription.findMany();
    return subscriptions.map(
      (d) =>
        new Subscription(
          d.id,
          d.url,
          d.title,
          d.interval,
          d.lastGuid ?? "",
          d.lastPost?.toISOString() ?? "",
          d.logo ?? "",
        ),
    );
  }

  public async create(
    url: string,
    interval: number,
  ): Promise<Subscription | null> {
    let subscription = await prisma.subscription.findUnique({
      where: {
        url,
      },
    });

    if (subscription)
      return new Subscription(
        subscription.id,
        subscription.title,
        subscription.url,
        subscription.interval,
        subscription.lastGuid ?? "",
        subscription.lastPost?.toISOString() ?? "",
        subscription.logo ?? "",
      );

    const response = await axios.get(url);

    if (typeof response.data !== "string") {
      return null;
    }

    const lastData = this.rss.getEssentials(response.data);
    this.rss.getLastPost(response.data);

    if (!lastData) {
      return null;
    }

    subscription = await prisma.subscription.create({
      data: {
        title: lastData.title,
        url,
        interval,
        lastGuid: lastData.lastGuid,
        lastPost: new Date(lastData.lastPost),
        logo: lastData.logo ?? null,
      },
    });

    const newSubscription = new Subscription(
      subscription.id,
      subscription.title,
      subscription.url,
      subscription.interval,
      subscription.lastGuid ?? "",
      subscription.lastPost?.toISOString() ?? "",
      subscription.logo ?? "",
    );

    return newSubscription;
  }

  public async join(url: string, userId: string): Promise<Subscription | null> {
    if (!Validator.urlSchema.parse(url)) {
      return null;
    }

    let subscription = await prisma.subscription.findUnique({
      where: {
        url,
      },
    });

    if (!subscription) {
      return null;
    }

    let userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId_subscriptionId: {
          userId,
          subscriptionId: subscription.id,
        },
      },
      include: {
        subscription: true,
      },
    });

    if (userSubscription) {
      return new Subscription(
        userSubscription.subscription.id,
        userSubscription.subscription.title,
        userSubscription.subscription.url,
        userSubscription.subscription.interval,
        userSubscription.subscription.lastGuid ?? "",
        userSubscription.subscription.lastPost?.toISOString() ?? "",
        userSubscription.subscription.logo ?? "",
      );
    }

    userSubscription = await prisma.userSubscription.create({
      data: {
        userId,
        subscriptionId: subscription.id,
      },
      include: {
        subscription: true,
      },
    });

    return new Subscription(
      userSubscription.subscription.id,
      userSubscription.subscription.title,
      userSubscription.subscription.url,
      userSubscription.subscription.interval,
      userSubscription.subscription.lastGuid ?? "",
      userSubscription.subscription.lastPost?.toISOString() ?? "",
      userSubscription.subscription.logo ?? "",
    );
  }
}

export { SubscriptionService };
