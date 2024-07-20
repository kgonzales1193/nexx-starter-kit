"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { SignUpSchema } from "@/validations";
import { signup } from "../../actions/signup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export const SignUpForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit: SubmitHandler<z.infer<typeof SignUpSchema>> = (values) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			signup(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='name'>Name</FormLabel>
								<FormControl>
									<Input
										autoComplete='name'
										id='name'
										{...field}
										disabled={isPending}
										type='text'
										placeholder='John Doe'
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
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='email'>Email</FormLabel>
								<FormControl>
									<Input
										autoComplete='email'
										id='email'
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
								<FormLabel htmlFor='password'>Password</FormLabel>
								<FormControl className='relative'>
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
				<div className='grid gap-2'>
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='confirmPassword'>
									Confirm Password
								</FormLabel>
								<FormControl className='relative'>
									<div className='relative'>
										<Input
											id='confirmPassword'
											disabled={isPending}
											{...field}
											type={showPassword ? "text" : "password"}
											placeholder='********'
										/>
										<button
											type='button'
											onClick={togglePasswordVisibility}
											className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none'>
											{showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
										</button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex flex-col mt-6 gap-3'>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type='submit' disabled={isPending} className='w-full'>
						Sign Up
					</Button>
				</div>
			</form>
		</Form>
	);
};
