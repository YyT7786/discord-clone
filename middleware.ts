import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/',
]);

const isPublicRoute = createRouteMatcher([
    '/api/uploadthing',
]);

export default clerkMiddleware((auth, request) => {
    if (isPublicRoute(request)) {
        return NextResponse.next();
    }

    if (isProtectedRoute(request)) {
        auth().protect()
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};