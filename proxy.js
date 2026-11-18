import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Runs before every page request. It refreshes the Supabase session cookies and
// sends signed-out visitors to the login page.
export async function proxy(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://etdoamwxndxcwxuszfip.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();
  const isSignedIn = Boolean(data?.claims);
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (!isSignedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isSignedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return response;
}

export const config = {
  // Skip static files and images; everything else goes through the check above.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
