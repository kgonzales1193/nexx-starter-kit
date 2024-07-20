import { UserRole } from "@prisma/client";
import NextAuth, { AdapterUser, User, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
	role: UserRole;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}
}
declare module "next-auth/jwt" {
	interface JWT {
		role?: UserRole;
	}
}
