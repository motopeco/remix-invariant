import {asyncInvariant, jsonInvariant} from "../src/remix-invariant";
import {TypedResponse} from "@remix-run/node";

async function condition(value: any) {
  return value
}

test("jsonInvariant valid condition", () => {
  expect(asyncInvariant(condition('test'))).resolves.toBe(undefined)
});

test("jsonInvariant valid condition, status=200", () => {
  expect(asyncInvariant(condition(1), 200)).resolves.toBe(undefined)
});

test("jsonInvariant valid condition, status=400", () => {
  expect(asyncInvariant(condition(9999), 400)).resolves.toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=string", () => {
  expect(asyncInvariant(condition('abcdefg'), 200, 'test message')).resolves.toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=function", () => {
  expect(asyncInvariant(condition({}), 400, () => 'test message')).resolves.toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=string, prodMessage=string", () => {
  expect(asyncInvariant(condition([]), 400, 'dev message', 'prod message')).resolves.toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=function, prodMessage=string", () => {
  expect(asyncInvariant(condition(new String('test')), 400, () => 'dev message', 'prod message')).resolves.toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=string, prodMessage=function", () => {
  expect(asyncInvariant(condition('abc'), 400, 'dev message', () => 'prod message')).resolves.toBe(undefined)
});

test("jsonInvariant valid condition, status, devMessage=function, prodMessage=function", () => {
  expect(asyncInvariant(condition('abcdefg'), 400, () => 'dev message', () => 'prod message')).resolves.toBe(undefined)
});
