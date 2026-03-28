// src/middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  // This protects all routes except the API, static files, and Next.js internals
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
