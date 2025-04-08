import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const role = req.cookies.get("role")?.value; // Get the role from cookies
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname === "/login";
  const isRegisterRoute = pathname === "/register";
  const isHomeRoute = pathname === "/"; // Handle root `/`
  const isProtectedRoute = !isAuthRoute && !isRegisterRoute; // All other routes

  // Redirect unauthenticated users trying to access protected routes
  if (!token) {
    if (isProtectedRoute || isHomeRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    // Redirect authenticated users to their respective dashboards
    if (isAuthRoute || isRegisterRoute || isHomeRoute) {
      let dashboardPath = "/company/dashboard"; // Default dashboard

      switch (role) {
        case "company":
          dashboardPath = "/company/dashboard";
          break;
        case "manager":
          dashboardPath = "/manager/dashboard";
          break;
        case "worker":
          dashboardPath = "/worker/dashboard";
          break;
      }

      return NextResponse.redirect(new URL(dashboardPath, req.url));
    }
  }

  return NextResponse.next();
}

// Apply Middleware to all routes
export const config = {
  matcher: ["/((?!_next|login|register).*)"], // Excludes _next assets
};
