"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { SignInSchema } from "@/validations";
import { signin } from "../../actions/signin";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { DEFAULT_ADMIN_LOGIN_REDIRECT } from "@/routes";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";

export const SignInForm = () => {
	const { data: session, status } = useSession();
	const [isPending, startTransition] = useTransition();
	const router = useRouter(); // Add useRouter for navigation
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with a different provider."
			: "";
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof SignInSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			signin(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}

					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}

					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError("An error occurred. Please try again."));
		});
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{showTwoFactor && (
					<>
						<div className='flex items-center justify-center w-full mx-auto'>
							<FormField
								control={form.control}
								name='code'
								render={({ field }) => (
									<FormControl>
										<>
											<FormItem>
												<FormLabel htmlFor='email'>
													<h2 className='font-bold text-center text-2xl'>
														Two-Factor Code
													</h2>
												</FormLabel>
												<FormDescription>
													<p>Enter your Two-Factor Code sent to your email.</p>
												</FormDescription>
												<InputOTP maxLength={6} {...field}>
													<InputOTPGroup>
														<InputOTPSlot index={0} />
														<InputOTPSlot index={1} />
														<InputOTPSlot index={2} />
													</InputOTPGroup>
													<InputOTPSeparator />
													<InputOTPGroup>
														<InputOTPSlot index={3} />
														<InputOTPSlot index={4} />
														<InputOTPSlot index={5} />
													</InputOTPGroup>
												</InputOTP>
											</FormItem>
											<FormMessage />
										</>
									</FormControl>
								)}
							/>
						</div>
					</>
				)}
				{!showTwoFactor && (
					<>
						<div className='grid gap-2'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='email'>Email</FormLabel>
										<FormControl>
											<Input
												id='email'
												autoComplete='email'
												{...field}
												disabled={isPending}
												type='email'
												placeholder='email@example.com'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-2'>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel htmlFor='password'>Password</FormLabel>
											<Link
												href='/auth/reset-password'
												className={cn(
													" w-fit",
													buttonVariants({ variant: "link" })
												)}>
												Forgot your password?
											</Link>
										</div>
										<FormControl>
											<div className='relative'>
												<Input
													id='password'
													disabled={isPending}
													{...field}
													type={showPassword ? "text" : "password"}
													placeholder='********'
												/>
												<button
													type='button'
													onClick={togglePasswordVisibility}
													className='absolute right-3 top-1/2 transform -translate-y-1/2'>
													{showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</>
				)}
				<div className='flex flex-col mt-4 gap-3'>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button type='submit' disabled={isPending} className='w-full'>
						{showTwoFactor ? "Verify" : "Sign In"}
					</Button>
				</div>
			</form>
		</Form>
	);
};
