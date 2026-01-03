import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/pricing",
    "/features(.*)",
    "/blog(.*)",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/security",
    "/login(.*)",
    "/signup(.*)",
    "/dashboard(.*)", // Temporary bypass
    "/api/webhooks(.*)",
    "/p/(.*)",
    "/testimonial/(.*)",
]);

// export default clerkMiddleware(async (auth, req) => {
//     if (!isPublicRoute(req)) {
//         await auth.protect();
//     }
// });

// export default clerkMiddleware(async (auth, req) => {
//     if (!isPublicRoute(req)) {
//         await auth.protect();
//     }
// });

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
