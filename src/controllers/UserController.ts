import z from "zod";
import type { UserService } from "../services/UserService";
import type { DefaultControllerProps } from "../types/defaultControllerProps";
import { Validator } from "../utils/Validator";

class UserController {
  constructor(private userService: UserService) {}

  public createUser = async ({ req, res }: DefaultControllerProps) => {
    const schema = z.object({
      email: Validator.emailSchema,
      name: Validator.nameSchema,
    });

    const { email, name } = schema.parse(req.body);

    try {
      const user = await this.userService.createUser(email, name);
      const token = this.userService.generateToken(user.getId());

      return res.status(201).json({ user, token });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  public updateUser = async ({ req, res }: DefaultControllerProps) => {
    const schema = z.object({
      id: z.string(),
      email: Validator.emailSchema,
      name: Validator.nameSchema,
    });

    const { id, email, name } = schema.parse(req.body);

    try {
      const user = await this.userService.updateUser(id, email, name);
      const token = this.userService.generateToken(user.getId());

      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  public getUserById = async ({ req, res }: DefaultControllerProps) => {
    const schema = z.object({
      id: z.string(),
    });

    const { id } = schema.parse(req.params);

    try {
      const user = await this.userService.getUserById(id);

      if (!user) return res.status(404).json({ error: "User not found" });

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  public getAllUsers = async ({ req, res }: DefaultControllerProps) => {
    try {
      const users = await this.userService.fetchAll();

      if (!users) return res.status(404).json({ error: "Users not found" });

      return res.json({ users });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  public login = async ({ req, res }: DefaultControllerProps) => {
    const schema = z.object({
      email: Validator.emailSchema,
      code: z
        .string()
        .max(6, { error: "Code must be 6 characters long" })
        .min(6, { error: "Code must be 6 characters long" }),
    });

    const { email, code } = schema.parse(req.body);
  };

  public logout = async ({ req, res }: DefaultControllerProps) => {
    try {
      const token = req.headers["authorization"]?.replace("Bearer ", "");

      if (!token) return res.status(401).json({ error: "Unauthorized" });

      return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      throw new Error("Internal server error");
    }
  };
}

export { UserController };
