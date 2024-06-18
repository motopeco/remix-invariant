import {jsonInvariant} from "../src/remix-invariant";
import {TypedResponse} from "@remix-run/node";

test("jsonInvariant valid condition", async () => {
  expect(jsonInvariant('test')).toBe(undefined)
});

test("jsonInvariant valid condition, status=200", async () => {
  expect(jsonInvariant(1, 200)).toBe(undefined)
});

test("jsonInvariant valid condition, status=400", async () => {
  expect(jsonInvariant(9999, 400)).toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=string", async () => {
  expect(jsonInvariant('abcdefg', 200, 'test message')).toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=function", async () => {
  expect(jsonInvariant({}, 400, () => 'test message')).toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=string, prodMessage=string", async () => {
  expect(jsonInvariant([], 400, 'dev message', 'prod message')).toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=function, prodMessage=string", async () => {
  expect(jsonInvariant(new String('test'), 400, () => 'dev message', 'prod message')).toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=string, prodMessage=function", async () => {
  expect(jsonInvariant('abc', 400, 'dev message', () => 'prod message')).toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=function, prodMessage=function", async () => {
  expect(jsonInvariant('abcdefg', 400, () => 'dev message', () => 'prod message')).toBe(undefined)
});
