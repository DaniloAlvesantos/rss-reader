import { Validator } from "../utils/Validator";

class User {
  private id!: string;
  private _email!: string;
  private _name!: string;
  private readonly validator: Validator = Validator.getInstance();

  constructor(id: string, email: string, name: string) {
    this.setId(id);
    this.setEmail(email);
    this.setName(name);
  }

  public setId(id: string): void {
    if (this.id === null) {
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

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this._email;
  }

  public getName(): string {
    return this._name;
  }

  public tostring(): string {
    return `User { id: ${this.id}, email: ${this._email}, name: ${this._name} }`;
  }

  public toJSON(): Object {
    return {
      id: this.id,
      email: this._email,
      name: this._name,
    };
  }
}

export { User };
