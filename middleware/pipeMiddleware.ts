import {
  NextResponse,
  NextMiddleware
} from 'next/server';

type MiddlewareHOC = (middleware: NextMiddleware) => NextMiddleware;

export default function pipeMiddleware(fns: MiddlewareHOC[], index = 0): NextMiddleware {
  const current = fns[index];

  if(current) {
    const next = pipeMiddleware(fns, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}