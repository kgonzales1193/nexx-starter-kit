"use client";

import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const SocialLogin = () => {
	const onSocialClick = (provider: "google" | "facebook") => {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		});
	};
	return (
		<div className='flex items-center justify-center gap-4 mt-6'>
			<Button
				variant='outline'
				className='w-full'
				size='lg'
				onClick={() => onSocialClick("google")}>
				<Icon
					icon='flat-color-icons:google'
					width='24'
					height='24'
					className='mr-2'
				/>
				Google
			</Button>
			<Button variant='outline' size='lg' className='w-full'>
				<Icon icon='logos:facebook' width='24' height='24' className='mr-2' />
				Facebook
			</Button>
		</div>
	);
};
export default SocialLogin;
