import z from "zod";
import type { UserService } from "../services/UserService";
import type { DefaultControllerProps } from "../types/defaultControllerProps";

class UserController {
  constructor(private userService: UserService) {}

  public createUser = async ({ req, res }: DefaultControllerProps) => {
    const schema = z.object({
      email: z.email({ pattern: z.regexes.email, error: "Invalid email" }),
      name: z
        .string()
        .trim()
        .min(3, { error: "Name must be at least 3 characters" })
        .max(255, { error: "Name must be less than 255 characters" }),
    });

    const { email, name } = schema.parse(req.body);

    try {
      const user = await this.userService.createUser(email, name);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  public updateUser = async ({ req, res }: DefaultControllerProps) => {
    const schema = z.object({
      id: z.string(),
      email: z.email({ pattern: z.regexes.email, error: "Invalid email" }),
      name: z
        .string()
        .trim()
        .min(3, { error: "Name must be at least 3 characters" })
        .max(255, { error: "Name must be less than 255 characters" }),
    });

    const {id, email, name} = schema.parse(req.body);

    try {
        const user = await this.userService.updateUser(id, email, name);
        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).json({ error: "Internal server error" });
    }
  };

  public getUserById = async ({ req, res }: DefaultControllerProps) => {
    const schema = z.object({
      id: z.string(),
    });

    const { id } = schema.parse(req.params);
  }

  public getAllUsers = async ({ req, res }: DefaultControllerProps) => {
    try {
      const users = await this.userService.fetchAll();

      if (!users) return res.status(404).json({ error: "Users not found" });

      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}

export { UserController };
