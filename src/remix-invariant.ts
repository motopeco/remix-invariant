import { json } from "@remix-run/node";

function getMessageWithError(
  message?: string | ((e?: Error) => string),
  error?: Error,
) {
  if (!message) {
    return "Invariant failed";
  }

  if (typeof message === "function") {
    return message(error);
  }

  return message;
}

function getMessage(message?: string | (() => string)) {
  if (!message) {
    return "Invariant failed";
  }

  if (typeof message === "function") {
    return message();
  }

  return message;
}

export function jsonInvariant(
  condition: any,
  status?: number,
): asserts condition;

export function jsonInvariant(
  condition: any,
  status?: number,
  devMessage?: string | (() => string),
): asserts condition;

export function jsonInvariant(
  condition: any,
  status?: number,
  devMessage?: string | (() => string),
  prodMessage?: string | (() => string),
): asserts condition;

export function jsonInvariant(
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

export function asyncInvariant(
  condition: Promise<any>,
  status?: number,
): Promise<Error | void>;

export function asyncInvariant(
  condition: Promise<any>,
  status?: number,
  devMessage?: string | (() => string),
): Promise<Error | void>;

export function asyncInvariant(
  condition: Promise<any>,
  status?: number,
  devMessage?: string | (() => string),
  prodMessage?: string | (() => string),
): Promise<Error | void>;

export async function asyncInvariant(
  condition: Promise<any>,
  status?: number,
  devMessage?: string | ((e?: Error) => string),
  prodMessage?: string | (() => string),
) {
  let error: Error | undefined;

  try {
    const result = await condition;
    if (result) {
      return;
    }
  } catch (e) {
    error = e as Error;
  }

  const devMsg = devMessage || "Invariant failed";
  const prodMsg = prodMessage || "Invariant failed";

  const msg =
    process.env.NODE_ENV === "production"
      ? getMessageWithError(prodMsg, error)
      : getMessageWithError(devMsg, error);
  throw json(
    {
      message: msg || "Invariant failed",
    },
    {
      status: status || 200,
    },
  );
}
