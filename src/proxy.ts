import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';

// Set once at module load, not per-request: env vars don't change between
// requests, and this avoids re-checking on every invocation.
const hasClerkKeys = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

const clerkHandler = hasClerkKeys ? clerkMiddleware() : null;

/**
 * Without Clerk keys configured, clerkMiddleware() throws on every request
 * (by design — Clerk refuses to run unconfigured). Rather than let that
 * surface as a generic "Something went wrong" error on every route, send
 * everything to a clean, static setup-required page that explains what's
 * missing. API routes get a JSON 503 instead of an HTML redirect. The real
 * auth flow resumes automatically the moment NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
 * and CLERK_SECRET_KEY are set — no further code changes needed.
 */
export default function proxy(req: NextRequest, event: NextFetchEvent) {
  if (clerkHandler) {
    return clerkHandler(req, event);
  }

  const { pathname } = req.nextUrl;

  if (pathname === '/setup-required') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      {
        error: 'Authentication is not configured',
        message:
          'Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in the deployment environment.'
      },
      { status: 503 }
    );
  }

  return NextResponse.redirect(new URL('/setup-required', req.url));
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
