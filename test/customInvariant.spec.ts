import { customInvariant } from "../src/remix-invariant";
import { json } from "@remix-run/node";

test("customInvariant invalid", () => {
  try {
    const v = "test" as string | null;

    customInvariant(v, () => {
      return json({
        message: "foobar",
      });
    });
  } catch (e) {
    expect(true).toBe(false);
  }
});

test("customInvariant valid", async () => {
  try {
    const v = null;

    customInvariant(v, () => {
      return json({
        message: "foobar",
      });
    });
  } catch (e) {
    const resp = e as Response;

    expect(resp.status).toBe(200);
    const data = await resp.json();
    expect(data.message).toBe("foobar");
  }
});

test("customInvariant valid status", async () => {
  try {
    const v = null;

    customInvariant(v, () => {
      return json(
        {
          message: "foobar",
        },
        {
          status: 400,
        },
      );
    });
  } catch (e) {
    const resp = e as Response;

    expect(resp.status).toBe(400);
    const data = await resp.json();
    expect(data.message).toBe("foobar");
  }
});
