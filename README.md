# remix-invariant

WIP

`remix-invariant` is a variable checking library inspired by [`tiny-invariant`](https://github.com/alexreardon/tiny-invariant)

## Installation

```bash
npm install remix-invariant
```

## Usage

```ts
import { invariant } from 'remix-invariant'

const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  invaliant(id, 'id is required')
  
  // ...
  
  return {}
}
```

If id is `undefined`, it will throw an error with the message `id is required` and show Error page.

ErrorBoundary

```tsx

export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data?.message && <p>{error.data.message}</p>}
        {/* ↑↑ <p>id is required</p> */}
      </div>
    )
  }
}

```
