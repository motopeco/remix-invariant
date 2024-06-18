import { invariant } from "../src/remix-invariant";
import { TypedResponse } from "@remix-run/node";

test("jsonInvariant valid condition", async () => {
  expect(invariant("test")).toBe(undefined);
});

test("jsonInvariant valid condition, status=200", async () => {
  expect(invariant(1, 200)).toBe(undefined);
});

test("jsonInvariant valid condition, status=400", async () => {
  expect(invariant(9999, 400)).toBe(undefined);
});

test("jsonInvariant valid condition, status, devMessage=string", async () => {
  expect(invariant("abcdefg", 200, "test message")).toBe(undefined);
});

test("jsonInvariant valid condition, status, devMessage=function", async () => {
  expect(invariant({}, 400, () => "test message")).toBe(undefined);
});

test("jsonInvariant valid condition, status, devMessage=string, prodMessage=string", async () => {
  expect(invariant([], 400, "dev message", "prod message")).toBe(undefined);
});

test("jsonInvariant valid condition, status, devMessage=function, prodMessage=string", async () => {
  expect(
    invariant(new String("test"), 400, () => "dev message", "prod message"),
  ).toBe(undefined);
});

test("jsonInvariant valid condition, status, devMessage=string, prodMessage=function", async () => {
  expect(invariant("abc", 400, "dev message", () => "prod message")).toBe(
    undefined,
  );
});

test("jsonInvariant valid condition, status, devMessage=function, prodMessage=function", async () => {
  expect(
    invariant(
      "abcdefg",
      400,
      () => "dev message",
      () => "prod message",
    ),
  ).toBe(undefined);
});
