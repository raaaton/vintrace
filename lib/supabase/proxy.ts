import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let supabaseResponse = NextResponse.next({ request });

    if (!hasEnvVars) return supabaseResponse;

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value),
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    // Refresh session if expired - MUST be called before any other Supabase logic
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    // Redirect logged-in users from Landing (/) to Dashboard
    if (user && pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = "/garage";
        const redirectResponse = NextResponse.redirect(url);
        // Transfer updated cookies to the redirect response
        supabaseResponse.cookies.getAll().forEach((cookie) => {
            redirectResponse.cookies.set(cookie);
        });
        return redirectResponse;
    }

    // Protect private routes: Redirect guests to /login
    const isAuthRoute =
        pathname.startsWith("/login") ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/auth");
    if (pathname !== "/" && !user && !isAuthRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        const response = NextResponse.redirect(url);
        supabaseResponse.cookies.getAll().forEach((cookie) => {
            response.cookies.set(cookie.name, cookie.value);
        });
        return response;
    }

    // Prevent logged-in users from accessing Auth pages
    if (
        user &&
        (pathname.startsWith("/login") || pathname.startsWith("/register"))
    ) {
        const url = request.nextUrl.clone();
        url.pathname = "/garage";
        const response = NextResponse.redirect(url);
        supabaseResponse.cookies.getAll().forEach((cookie) => {
            response.cookies.set(cookie.name, cookie.value);
        });
        return response;
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    // const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    // myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    // the cookies!
    // 4. Finally:
    // return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse;
}
