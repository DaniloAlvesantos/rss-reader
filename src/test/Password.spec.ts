import { it, describe } from "node:test";
import assert from "node:assert/strict";
import { Password } from "../utils/Password";

describe("Password encrypt", () => {
  const password = "password";

  it("Should encrypt a password", () => {
    const { hash, salts } = Password.hash(password);

    assert.equal(typeof hash, "string");
    assert.equal(typeof salts, "string");
  });

  it("Should compare a password", () => {
    const { hash, salts } = Password.hash(password);

    const isVerifed = Password.compare(password, hash, salts);

    assert.equal(isVerifed, true);
  });

  it("Should not compare it", () => {
    // const verify = Password.compare(password, "");
  })
});
