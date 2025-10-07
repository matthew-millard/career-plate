import { maskEmail } from "./utils";
import { test, expect, describe } from "vitest";

describe("maskEmail", () => {
  test("should mask valid email", () => {
    expect(maskEmail("matt.millar@gmail.com")).toBe("m***r@gmail.com");
  });

  test("should not mask first and last character of the username", () => {
    expect(maskEmail("john.doe@example.com")).toBe("j***e@example.com");
  });

  test("should mask first and last character of the ccTLD and ccSLD", () => {
    expect(maskEmail("brian@bbc.co.uk")).toBe("b***n@bbc.co.uk");
  });

  test("should not mask email given an address with a single-char username", () => {
    expect(maskEmail("a@b.com")).toBe("a@b.com");
  });

  test("should mask email given an address with a two-char username", () => {
    expect(maskEmail("ab@b.com")).toBe("a***b@b.com");
  });

  test("should return null for invalid email", () => {
    expect(maskEmail("not-an-email")).toBeNull();
  });

  test("should mask email with plus addressing", () => {
    expect(maskEmail("john+tag@example.com")).toBe("j***g@example.com");
  });

  test("should mask email with punctuation in username", () => {
    expect(maskEmail("j.o_h-n@example.com")).toBe("j***n@example.com");
  });

  test("should not preserve case in username and domain", () => {
    expect(maskEmail("John.Doe@Example.COM")).toBe("j***e@example.com");
  });

  test("should preserve full subdomain chain", () => {
    expect(maskEmail("user@sub.api.example.co.uk")).toBe(
      "u***r@sub.api.example.co.uk",
    );
  });

  test("should handle three-char usernames", () => {
    expect(maskEmail("abc@example.com")).toBe("a***c@example.com");
  });

  test("should return null for emails with surrounding whitespace (no trim)", () => {
    expect(maskEmail("  a@b.com  ")).toBeNull();
  });

  test("should return null for multiple at signs", () => {
    expect(maskEmail("john@@example.com")).toBeNull();
  });

  test("should handle very long usernames", () => {
    expect(maskEmail("averyveryverylongusername@example.com")).toBe(
      "a***e@example.com",
    );
  });

  // If your validator accepts punycode domains:
  test("should support punycode domains", () => {
    expect(maskEmail("user@xn--bcher-kva.de")).toBe("u***r@xn--bcher-kva.de");
  });
});
