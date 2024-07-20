"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { ResetPasswordSchema, SignInSchema } from "@/validations";
import { signin } from "../../actions/signin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetpassword } from "../../actions/reset-password";

export const ResetForm = () => {
	const [isPending, startTransition] = useTransition();

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			resetpassword(values).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
			});
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
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

				<div className='flex flex-col mt-4 gap-3'>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type='submit' disabled={isPending} className='w-full'>
						Send Reset Link
					</Button>
				</div>
			</form>
		</Form>
	);
};
