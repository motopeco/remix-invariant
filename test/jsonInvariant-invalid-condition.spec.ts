import { invariant } from "../src/remix-invariant";
import { TypedResponse } from "@remix-run/node";

test("jsonInvariant invalid condition", async () => {
  try {
    invariant(undefined);
    expect(true).toBe(false);
  } catch (e) {
    expect(e instanceof Error).toBe(false);

    const response = e as TypedResponse<{
      message: string;
    }>;

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.message).toBe("Invariant failed");
  }
});

test("jsonInvariant invalid condition, status=200", async () => {
  try {
    invariant(0, 200);
    expect(true).toBe(false);
  } catch (e) {
    expect(e instanceof Error).toBe(false);

    const response = e as TypedResponse<{
      message: string;
    }>;

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.message).toBe("Invariant failed");
  }
});

test("jsonInvariant invalid condition, status=400", async () => {
  try {
    invariant(false, 400);
    expect(true).toBe(false);
  } catch (e) {
    expect(e instanceof Error).toBe(false);

    const response = e as TypedResponse<{
      message: string;
    }>;

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toBe("Invariant failed");
  }
});

test("jsonInvariant invalid condition, status, devMessage=string", async () => {
  try {
    invariant(null, 400, "test message");
    expect(true).toBe(false);
  } catch (e) {
    expect(e instanceof Error).toBe(false);

    const response = e as TypedResponse<{
      message: string;
    }>;

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toBe("test message");
  }
});

test("jsonInvariant invalid condition, status, devMessage=function", async () => {
  try {
    invariant("", 400, () => "test message");
    expect(true).toBe(false);
  } catch (e) {
    expect(e instanceof Error).toBe(false);

    const response = e as TypedResponse<{
      message: string;
    }>;

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toBe("test message");
  }
});

test("jsonInvariant invalid condition, status, devMessage=string, prodMessage=string", async () => {
  try {
    invariant(undefined, 400, "dev message", "prod message");
    expect(true).toBe(false);
  } catch (e) {
    expect(e instanceof Error).toBe(false);

    const response = e as TypedResponse<{
      message: string;
    }>;

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toBe("dev message");
  }
});

test("jsonInvariant invalid condition, status, devMessage=function, prodMessage=string", async () => {
  try {
    invariant(undefined, 400, () => "dev message", "prod message");
    expect(true).toBe(false);
  } catch (e) {
    expect(e instanceof Error).toBe(false);

    const response = e as TypedResponse<{
      message: string;
    }>;

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toBe("dev message");
  }
});

test("jsonInvariant invalid condition, status, devMessage=string, prodMessage=function", async () => {
  try {
    invariant(undefined, 400, "dev message", () => "prod message");
    expect(true).toBe(false);
  } catch (e) {
    expect(e instanceof Error).toBe(false);

    const response = e as TypedResponse<{
      message: string;
    }>;

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toBe("dev message");
  }
});

test("jsonInvariant invalid condition, status, devMessage=function, prodMessage=function", async () => {
  try {
    invariant(
      undefined,
      400,
      () => "dev message",
      () => "prod message",
    );
    expect(true).toBe(false);
  } catch (e) {
    expect(e instanceof Error).toBe(false);

    const response = e as TypedResponse<{
      message: string;
    }>;

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toBe("dev message");
  }
});
