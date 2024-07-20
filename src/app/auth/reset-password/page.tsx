import Image from "next/image";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { SignInForm } from "../_components/authentication/SignInForm";
import SocialLogin from "../_components/authentication/SocialLogin";
import { ResetForm } from "../_components/authentication/ResetForm";

export default function ResetPasswordPage() {
	return (
		<main className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
			<div className='flex flex-col h-screen items-center justify-center py-12'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2 text-center'>
						<h3 className='font-bold text-3xl'>Reset Password</h3>
						<p className='text-balance text-muted-foreground'>
							Enter your credentials to continue.
						</p>
					</div>
					<div className='grid gap-4'>
						<ResetForm />
					</div>
					<Link
						href={"/auth/sign-in"}
						className={cn(
							"mt-10",
							buttonVariants({
								variant: "link",
							})
						)}>
						<ArrowLeftIcon className='mr-2 h-4 w-4' />
						Back to Sign In
					</Link>
				</div>
			</div>
			<div className='hidden bg-muted lg:block'>
				<Image
					src='/forgotpassword.svg'
					alt='Login illustration'
					width='1920'
					height='1080'
					priority
					className='h-full w-full object-contain dark:brightness-[0.2] dark:grayscale'
				/>
			</div>
		</main>
	);
}
