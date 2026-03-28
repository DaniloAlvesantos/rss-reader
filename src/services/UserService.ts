import { prisma } from "../lib/prisma";
import { User } from "../models/User";
import { Authentication } from "./Authentication";

class UserService {
  public generateToken(userId: string): string {
    return Authentication.generateToken(userId);
  }

  public verifyToken(token: string): string | object {
    return Authentication.verifyToken(token);
  }

  public async createUser(email: string, name: string): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return new User(user.id, user.email, user.name);
  }

  public async updateUser(
    id: string,
    email: string,
    name: string,
  ): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
      },
    });

    return new User(user.id, user.email, user.name);
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return new User(user.id, user.email, user.name);
  }

  public async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return new User(user.id, user.email, user.name);
  }

  public async fetchAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((d) => new User(d.id, d.email, d.name));
  }
}

export { UserService };
