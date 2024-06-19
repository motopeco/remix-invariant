import { simpleInvariant } from "../src/remix-invariant";

test("simpleInvariant invalid", () => {
  try {
    const v = "test" as string | null;

    simpleInvariant(v, "test");
  } catch (e) {
    expect(true).toBe(false);
  }
});

test("simpleInvariant valid", async () => {
  try {
    const v = null;

    simpleInvariant(v, "test");
  } catch (e) {
    const resp = e as Response;

    expect(resp.status).toBe(200);
    const data = await resp.json();
    expect(data.message).toBe("test");
  }
});

test("simpleInvariant valid status", async () => {
  try {
    const v = null;

    simpleInvariant(v, "test", 400);
  } catch (e) {
    const resp = e as Response;

    expect(resp.status).toBe(400);
    const data = await resp.json();
    expect(data.message).toBe("test");
  }
});
