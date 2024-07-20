import NextAuth from "next-auth";
import authConfig from "./auth.config";

import {
	DEFAULT_ADMIN_LOGIN_REDIRECT,
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
	adminRoutes,
} from "@/routes";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
	const { nextUrl } = req;

	const isLoggedIn = !!req.auth;
	const userRole = req.auth?.user.role;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

	console.log("Pathname:", nextUrl.pathname);
	console.log("Is API Auth Route:", isApiAuthRoute);
	console.log("Is Public Route:", isPublicRoute);
	console.log("Is Auth Route:", isAuthRoute);
	console.log("Is Admin Route:", isAdminRoute);
	console.log("Is Logged In:", isLoggedIn);
	console.log("User Role:", userRole);

	if (isApiAuthRoute) {
		return;
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return;
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL("/auth/sign-in", nextUrl));
	}

	if (isAdminRoute && userRole !== "ADMIN") {
		return Response.redirect(new URL("/access-denied", nextUrl));
	}

	return;
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
