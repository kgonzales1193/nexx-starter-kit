import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { SignInSchema } from "./validations";
import { getUserByEmail, getUserById } from "./data-access/user";
import { db } from "./lib/db";
import { getSession, useSession } from "next-auth/react";
import { DEFAULT_ADMIN_LOGIN_REDIRECT, DEFAULT_LOGIN_REDIRECT } from "./routes";
import { getTwoFactorConfirmationByUserId } from "./data-access/two-factor-confirmation";

// Notice this is only an object, not a full Auth.js instance
export default {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
			clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
		}),
		Credentials({
			async authorize(credentials) {
				const validatedFields = SignInSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);
					if (!user || !user.password) return null;

					const passwordMatch = await bcrypt.compare(password, user.password);

					if (passwordMatch) return user;
				}

				return null;
			},
		}),
	],
	pages: {
		signIn: "/auth/sign-in",
		error: "/auth/error",
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: {
					id: user.id,
				},
				data: {
					emailVerified: new Date(),
				},
			});
		},
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			if (url.startsWith(baseUrl)) {
				return url;
			} else if (url.startsWith("/")) {
				return new URL(url, baseUrl).toString();
			}
			return baseUrl;
		},
		async signIn({ user, account }) {
			console.log({ account, user });
			// Allow Oauth without email verification
			if (account?.provider !== "credentials") return true;

			const existingUser = await getUserById(user.id || "");

			//Prevent Signin without email verification
			if (!existingUser?.emailVerified) return false;

			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id
				);

				//Prevent Signin without 2FA confirmation
				if (!twoFactorConfirmation) return false;

				//Delete the 2FA confirmation token for next sign in
				await db.twoFactorConfirmation.delete({
					where: {
						id: twoFactorConfirmation.id,
					},
				});
			}

			return true;
		},

		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (token.role && session.user) {
				session.user.role = token.role;
			}

			return session;
		},

		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;

			token.role = existingUser.role;

			return token;
		},
	},
	session: { strategy: "jwt" },
} satisfies NextAuthConfig;
