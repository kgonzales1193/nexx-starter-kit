import Image from "next/image";
import Link from "next/link";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { NewPasswordForm } from "../../_components/authentication/NewPasswordForm";

export default function NewPasswordPage() {
	return (
		<div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
			<div className='flex flex-col h-screen items-center justify-center py-12'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2 text-center'>
						<h1 className='text-3xl font-bold'>Create New Password</h1>
						<p className='text-balance text-muted-foreground'>
							Enter your desired password.
						</p>
					</div>
					<div className='grid gap-4'>
						<NewPasswordForm />
					</div>
					<Link
						href={"/auth/sign-in"}
						className={cn("mt-10", buttonVariants({ variant: "link" }))}>
						<ArrowLeftIcon className='mr-2 h-4 w-4' />
						Back to Sign In
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
