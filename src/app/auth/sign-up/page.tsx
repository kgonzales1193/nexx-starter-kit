import Image from "next/image";
import Link from "next/link";

import SocialLogin from "../_components/authentication/SocialLogin";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignUpForm } from "../_components/authentication/SignUpForm";

export default function SignUpPage() {
	return (
		<div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
			<div className='flex flex-col h-screen items-center justify-center py-12'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2 text-center'>
						<h1 className='text-3xl font-bold'>Sign Up</h1>
						<p className='text-balance text-muted-foreground'>
							Enter your details below to create an account.
						</p>
					</div>
					<div className='grid gap-4'>
						<SignUpForm />
					</div>
					<div>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-background px-2 text-muted-foreground'>
									Or continue with
								</span>
							</div>
						</div>
						<SocialLogin />
					</div>
					<div className='mt-4 text-center text-sm'>
						Already have an account?{" "}
						<Link href='/auth/sign-in' className='underline'>
							Sign In
						</Link>
					</div>
					<Link
						href={"/"}
						className={cn("mt-10", buttonVariants({ variant: "link" }))}>
						<ArrowLeftIcon className='mr-2 h-4 w-4' />
						Back to Home
					</Link>
				</div>
			</div>
			<div className='hidden bg-muted lg:block'>
				<Image
					src='/signup.svg'
					alt='Image'
					width='1920'
					height='1080'
					priority
					className='h-full w-full object-contain dark:brightness-[0.2] dark:grayscale'
				/>
			</div>
		</div>
	);
}
