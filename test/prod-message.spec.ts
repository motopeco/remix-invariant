import {asyncInvariant, jsonInvariant} from "../src/remix-invariant";
import {TypedResponse} from "@remix-run/node";


async function condition(value: any) {
  return value
}

beforeEach(() => {
  process.env.NODE_ENV = 'production'
})

afterEach(() => {
  process.env.NODE_ENV = 'development'
})

test('jsonInvariant-prod-condition', async () => {
  try {
    jsonInvariant(undefined, 400, 'dev', 'prod')
    expect(true).toBe(false)
  } catch (e) {
    expect(e instanceof Error).toBe(false)

    const response = e as TypedResponse<{
      message: string
    }>

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toBe('prod')
  }
})

test('jsonInvariant-prod-condition function', async () => {
  try {
    jsonInvariant(undefined, 400, 'dev', () => 'prod')
    expect(true).toBe(false)
  } catch (e) {
    expect(e instanceof Error).toBe(false)

    const response = e as TypedResponse<{
      message: string
    }>

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toBe('prod')
  }
})

test('asyncInvariant-prod-condition', async () => {
  try {
    await asyncInvariant(condition(undefined), 400, 'dev', 'prod')
    expect(true).toBe(false)
  } catch (e) {
    expect(e instanceof Error).toBe(false)

    const response = e as TypedResponse<{
      message: string
    }>

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toBe('prod')
  }
})

test('asyncInvariant-prod-condition function', async () => {
  try {
    await asyncInvariant(condition(undefined), 400, 'dev', () => 'prod')
    expect(true).toBe(false)
  } catch (e) {
    expect(e instanceof Error).toBe(false)

    const response = e as TypedResponse<{
      message: string
    }>

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toBe('prod')
  }
})
