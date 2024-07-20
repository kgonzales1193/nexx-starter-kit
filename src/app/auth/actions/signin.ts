"use server";

import * as z from "zod";
import { SignInSchema } from "@/validations";
import { auth, signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data-access/user";
import {
	generateTwoFactorToken,
	generateVerificationToken,
} from "@/lib/tokens";

import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data-access/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data-access/two-factor-confirmation";

export const signin = async (values: z.infer<typeof SignInSchema>) => {
	const validatedFields = SignInSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields", success: "" };
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: "Email or password do not match on our records." };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);
		return {
			error:
				"Email not verified! Please check your email to verify your account.",
		};
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

			if (!twoFactorToken) {
				return { error: "Invalid two factor code" };
			}

			if (twoFactorToken.token !== code) {
				return { error: "Invalid two factor code" };
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date();

			if (hasExpired) {
				return { error: "Two factor code has expired" };
			}

			await db.twoFactorToken.delete({
				where: {
					id: twoFactorToken.id,
				},
			});

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id
			);

			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: {
						id: existingConfirmation.id,
					},
				});
			}
			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
			return { twoFactor: true };
		}
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials" };
				default:
					return { error: "Invalid credentials!" };
			}
		}
		throw error;
	}
};
