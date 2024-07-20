import * as z from "zod";

export const SignInSchema = z.object({
	email: z.string().email({
		message: "Email is required.",
	}),
	password: z.string().min(1, {
		message: "Password is required.",
	}),
	code: z.optional(z.string()),
});

export const SignUpSchema = z
	.object({
		name: z.string().min(1, {
			message: "Name is required.",
		}),
		email: z.string().email({
			message: "Email is required.",
		}),
		password: z.string().min(6, {
			message: "Password should be atleast 6 characters.",
		}),
		confirmPassword: z.string().min(6, {
			message: "Password should be atleast 6 characters.",
		}),
	})
	.refine(
		(values) => {
			return values.password === values.confirmPassword;
		},
		{
			message: "Passwords must match!",
			path: ["confirmPassword"],
		}
	);

export const ResetPasswordSchema = z.object({
	email: z.string().email({
		message: "Email is required.",
	}),
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: "Password should be atleast 6 characters.",
	}),
	confirmPassword: z.string().min(6, {
		message: "Password should be atleast 6 characters.",
	}),
});
