"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

import { SignUpSchema } from "@/validations";
import { getUserByEmail } from "@/data-access/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

// import { generateVerificationToken } from "@/lib/tokens";
// import { sendVerificationEmail } from "@/lib/resend";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
	const validatedFields = SignUpSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { name, email, password, confirmPassword } = validatedFields.data;

	// Check if password and confirmPassword match
	if (password !== confirmPassword) {
		return { error: "Passwords do not match" };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: "Email already in use!" };
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	const verificationToken = await generateVerificationToken(email);

	await sendVerificationEmail(verificationToken.email, verificationToken.token);

	return {
		success: "Success! Please check your email to confirm your registration.",
	};
};
