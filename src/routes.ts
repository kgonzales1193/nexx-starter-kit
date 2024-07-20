/**
 * An array of routes that are accessible to the public
 * @type {string[]}
 */

export const publicRoutes = [
	"/",
	"/about",
	"/contact",
	"/auth/new-verification",
	"/auth/reset-password",
	"/auth/reset-password/new-password",
];

/**
 * An array of routes that are used for authentication
 * these routes will redirect logged in users to the default redirect route
 * @type {string[]}
 */

export const authRoutes = ["/auth/sign-in", "/auth/sign-up", "/auth/error"];

/**
 * An array of routes that are accessible to the admin
 * @type {string[]}
 */

export const adminRoutes = [
	"/admin",
	"/admin/dashboard",
	"/admin/users",
	"/admin/settings",
	"/admin/notifications",
];

/**
 * The prefix for API routes that are used for authentication
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default route to redirect of regular USER after a successful login
 * This route is used when no redirect route is provided
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * The default route to redirect of ADMIN after a successful login
 * This route is used when no redirect route is provided
 * @type {string}
 */

export const DEFAULT_ADMIN_LOGIN_REDIRECT = "/admin/dashboard";
