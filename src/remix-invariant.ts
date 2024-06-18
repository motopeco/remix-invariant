import { json } from "@remix-run/node";

function getMessage(message?: string | (() => string)) {
  if (!message) {
    return "Invariant failed";
  }

  if (typeof message === "function") {
    return message();
  }

  return message;
}

export function invariant(condition: any, status?: number): asserts condition;

export function invariant(
  condition: any,
  status?: number,
  devMessage?: string | (() => string),
): asserts condition;

export function invariant(
  condition: any,
  status?: number,
  devMessage?: string | (() => string),
  prodMessage?: string | (() => string),
): asserts condition;

export function invariant(
  condition: any,
  status?: number,
  devMessage?: string | (() => string),
  prodMessage?: string | (() => string),
) {
  if (condition) {
    return;
  }

  const devMsg = devMessage || "Invariant failed";
  const prodMsg = prodMessage || "Invariant failed";

  const msg =
    process.env.NODE_ENV === "production"
      ? getMessage(prodMsg)
      : getMessage(devMsg);
  throw json(
    {
      message: msg || "Invariant failed",
    },
    {
      status: status || 200,
    },
  );
}
