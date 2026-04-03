import { prisma } from "../lib/prisma";
import { User } from "../models/User";
import type { JsonWebTokenPayload } from "../types/jwt";
import { Password } from "../utils/Password";
import { Authentication } from "./Authentication";

class UserService {
  public generateToken(userId: string): string {
    return Authentication.generateToken(userId);
  }

  public verifyToken(token: string): JsonWebTokenPayload | null {
    return Authentication.verifyToken(token);
  }

  public async createUser(
    email: string,
    name: string,
    passowrd: string,
  ): Promise<User> {
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) return new User(user.id, user.email, user.name, passowrd);

    const { hash, salts } = Password.hash(passowrd);

    user = await prisma.user.create({
      data: {
        email,
        name,
        password: hash,
        passwordSalt: salts,
      },
    });

    return new User(user.id, user.email, user.name, hash);
  }

  public async login(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;


    const verifiedPassword = Password.compare(password, user.password, user.passwordSalt);

    if(!verifiedPassword) {
      return null;
    }

    return new User(user.id, user.email, user.name, user.password);
  }

  public async updateUser(
    id: string,
    email: string,
    name: string,
  ): Promise<User> {
    const user = this.getUserById(id);

    if (!user) throw new Error("User not found");

    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
      },
    });

    return new User(
      updated.id,
      updated.email,
      updated.name,
      updated.password,
    );
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return new User(user.id, user.email, user.name, user.password);
  }

  public async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return new User(user.id, user.email, user.name, user.password);
  }

  public async fetchAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((d) => new User(d.id, d.email, d.name, d.password));
  }
}

export { UserService };
