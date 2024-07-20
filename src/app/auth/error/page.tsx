import Bounded from "@/components/Bounded";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
	return (
		<Bounded as='main'>
			<div className='flex flex-col items-center justify-center min-h-[90dvh]'>
				<h1 className='text-4xl font-bold text-center'>
					Oops! Something went wrong.
				</h1>
				<p className='mt-4 text-center mb-4'>
					An error occurred while processing your request and we were unable to
					complete it.
				</p>
				<Image src='/error.svg' alt='Error' width={400} height={400} />
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
		</Bounded>
	);
}
