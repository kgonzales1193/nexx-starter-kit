import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
	const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: "onboarding@keiprojects.com",
		to: email,
		subject: "Verify your email",
		html: `
      <h1>Verify your email</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationLink}">Verify email</a>
    `,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const passwordResetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/new-password?token=${token}`;

	await resend.emails.send({
		from: "onboarding@keiprojects.com",
		to: email,
		subject: "Reset your password",
		html: `
			<h1>Reset your password</h1>
			<p>Click the link below to reset your password:</p>
			<a href="${passwordResetLink}">Reset password</a>
		`,
	});
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: "onboarding@keiprojects.com",
		to: email,
		subject: "Two-factor authentication Code",
		html: `
			<h1>Two-factor authentication Code</h1>
			<p>Your two-factor authentication code is: <strong>${token}</strong></p>
		`,
	});
};
