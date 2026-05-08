import { it, describe } from "node:test";
import assert from "node:assert/strict";
import { User } from "../models/User";
import { UserService } from "../services/UserService";

describe("User Model", () => {
  const createJohnDoe = () => {
    return new User(
      crypto.randomUUID(),
      "test@gmail.com",
      "John Doe",
      "password",
    );
  };

  it("Should create a new User", () => {
    const user = createJohnDoe();

    assert.equal(user.getEmail(), "test@gmail.com");
    assert.equal(user.getName(), "John Doe");
    assert.equal(user.getPassword(), "password");
  });

  it("Should change the email of a user", () => {
    const user = createJohnDoe();
    assert.equal(user.getEmail(), "test@gmail.com");

    user.setEmail("test2@yahoo.com");
    assert.equal(user.getEmail(), "test2@yahoo.com");
  });
});

describe("User Service", () => {
  const service = new UserService();

  it("Should create a new user", async () => {
    const user = await service.createUser(
      "test@gmail.com",
      "John Doe",
      "password",
    );

    assert.equal(user.getEmail(), "test@gmail.com");
  });

  it("Should login a user", async () => {
    const user = await service.login("test@gmail.com", "password");

    assert.equal(user?.getEmail(), "test@gmail.com");
  });

  it("Should fetch all users", async () => {
    const users = await service.fetchAll();

    assert.equal(users.length >= 1, true);
    assert.equal(users[0] instanceof User, true);
  });

  it("Should delete the user", async () => {
    let user = await service.getUserByEmail("test@gmail.com");

    assert.equal(user?.getEmail(), "test@gmail.com");

    await service.deleteUser(user!.getId());

    user = await service.getUserByEmail("test@gmail.com");

    assert.equal(user, null);
  });
});

describe("User Controller", () => {
  it("Should create a new user", async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@gmail.com",
        name: "John Doe",
        password: "password",
      }),
    });

    const data = await response.json();

    assert.equal(data.user.email, "test@gmail.com");
    assert.equal(typeof data.token, "string");
  });
});
