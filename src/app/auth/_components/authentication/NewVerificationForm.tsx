"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import { newVerification } from "../../actions/new-verification";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NewVerificationForm() {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const onSubmit = useCallback(() => {
		if (success || error) return;

		if (!token) {
			setError("Missing token!");
			return;
		}

		newVerification(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError("Something went wrong! Please try again.");
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<div className='h-full flex items-center justify-center'>
			<Card className='w-[400px] gap-4'>
				<CardHeader className='flex flex-col items-center justify-center'>
					<CardTitle>Account Verification</CardTitle>
					<CardDescription>
						Please wait while we verify your account.
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col space-y-4 items-center justify-center'>
					{!success && !error && <BeatLoader />}
					<FormSuccess message={success} />
					{!success && <FormError message={error} />}
				</CardContent>
				<CardFooter className='flex items-center justify-center space-y-4'>
					<Link href='/auth/sign-in' className={cn(buttonVariants())}>
						Back to Sign In
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
