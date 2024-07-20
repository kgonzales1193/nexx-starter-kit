"use server";

import { getUserByEmail } from "@/data-access/user";
import { getVerificationTokenByToken } from "@/data-access/verification-token";
import { db } from "@/lib/db";
import { isVerificationTokenExpired } from "@/lib/tokens";

export const newVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		return { error: "Invalid token!" };
	}

	const hasExpired = isVerificationTokenExpired(existingToken.expires);

	if (hasExpired) {
		return { error: "Token has expired!" };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: "User not found!" };
	}

	await db.user.update({
		where: {
			id: existingUser.id,
		},
		data: {
			emailVerified: new Date(),
			email: existingToken.email,
		},
	});

	await db.verificationToken.delete({
		where: {
			id: existingToken.id,
		},
	});

	return { success: "Email verified!" };
};
