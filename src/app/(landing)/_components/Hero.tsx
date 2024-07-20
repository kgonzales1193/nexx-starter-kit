import { siteConfig } from "@/config/site";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Bounded from "@/components/Bounded";

export const Hero = () => {
	return (
		<Bounded className='items-center justify-center pt-20 lg:pt-40'>
			<div className='flex flex-col max-w-5xl w-full mx-auto items-center text-center justify-center lg:space-y-10'>
				<div className='flex flex-col items-center justify-center space-y-4'>
					<Link
						href={siteConfig.links.twitter}
						className='rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium'
						target='_blank'>
						Follow along on Twitter
					</Link>
					<h1 className='font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl capitalize tracking-wide'>
						launch your app in Minutes with{" "}
						<span className='bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
							NexX Starter Kit
						</span>{" "}
						🚀
					</h1>
					<p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
						I&apos;m building a web app with Next.js 14 and open sourcing
						everything. Follow along as we figure this out together.
					</p>
					<div className='space-x-4'>
						<Link
							href='/auth/sign-up'
							className={cn(buttonVariants({ size: "lg" }))}>
							Get Started
						</Link>
						<Link
							href={siteConfig.links.github}
							target='_blank'
							rel='noreferrer'
							className={cn(
								buttonVariants({ variant: "outline", size: "lg" })
							)}>
							GitHub
						</Link>
					</div>
				</div>
				<div className='flex items-center justify-center lg:pt-32'>
					<Image
						src='/hero.png'
						alt='hero'
						priority
						height={1024}
						width={1024}
						className='hidden lg:flex object-cover rounded-xl drop-shadow-xl'
					/>
				</div>
			</div>
		</Bounded>
	);
};
