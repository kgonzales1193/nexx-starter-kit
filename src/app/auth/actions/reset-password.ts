"use server";
import { getUserByEmail } from "@/data-access/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetPasswordSchema } from "@/validations";
import * as z from "zod";

export const resetpassword = async (
	values: z.infer<typeof ResetPasswordSchema>
) => {
	const validatedFields = ResetPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid email." };
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: "Email does not exist." };
	}

	const passwordResetToken = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token
	);

	return { success: "Reset password email sent" };
};
