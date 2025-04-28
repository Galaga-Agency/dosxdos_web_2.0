import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for existing cookie consent
  const cookieConsent = request.cookies.get("cookie_consent");

  // If no consent is given, you might want to modify behavior
  if (!cookieConsent) {
    // Just continue - the banner will show client-side
    // We don't need to console.log in production
  } else {
    // Parse consent for potential conditional logic
    try {
      const consent = JSON.parse(cookieConsent.value);

      // Here you could conditionally handle routes based on consent
      // For example, block analytics scripts if analytics consent is false
    } catch (error) {
      // Invalid cookie format, we'll treat as no consent
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|assets/).*)",
  ],
};
