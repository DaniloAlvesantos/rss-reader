import { Validator } from "../utils/Validator";

class User {
  private id!: string;
  private _email!: string;
  private _name!: string;
  private _password!: string;
  private readonly validator: Validator = Validator.getInstance();

  constructor(id: string, email: string, name: string, password: string) {
    this.setId(id);
    this.setEmail(email);
    this.setName(name);
    this.setPassword(password);
  }

  public setId(id: string): void {
    if (!this.id) {
      this.id = id;
    }
  }

  public setEmail(email: string): void {
    if (this.validator.email(email)) {
      this._email = email;
    } else {
      throw new Error("Invalid email format: " + email);
    }
  }

  public setName(name: string): void {
    if (this.validator.name(name)) {
      this._name = name;
    } else {
      throw new Error("Invalid name format: " + name);
    }
  }

  public setPassword(password: string): void {
    if (!this._password) {
      this._password = password;
    }
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this._email;
  }

  public getName(): string {
    return this._name;
  }

  public getPassword(): string {
    return this._password;
  }

  public tostring(): string {
    return `User { id: ${this.id}, email: ${this._email}, name: ${this._name} }`;
  }
}

export { User };
