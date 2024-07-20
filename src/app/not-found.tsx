import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className='flex flex-col items-center min-h-screen justify-center gap-4'>
			<Image
				src='/404.svg'
				width='720'
				height='720'
				priority
				className='object-cover'
				alt='404'
			/>
			<h1 className='font-medium text-3xl'>
				The Page you are looking for could not be found.
			</h1>
			<Link href='/' className={cn(buttonVariants({ variant: "default" }))}>
				Go back Home
			</Link>
		</div>
	);
}
