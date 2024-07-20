import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function AccessDeniedPage() {
	return (
		<div className='flex items-center min-h-[100dvh] justify-center'>
			<div className='container mx-auto'>
				<div className='flex flex-col items-center'>
					<h1 className='font-extrabold text-5xl mb-4'>Access Denied</h1>
					<p className='text-muted-foreground font-medium text-lg'>
						You are not authorized to access this page. Please contact your
						administrator to get access.
					</p>
					<div className='mt-4 mb-5'>
						<ExclamationTriangleIcon className='h-24 w-24 text-red-500' />
					</div>
					<Link href='/' className={cn(buttonVariants({ variant: "link" }))}>
						<ArrowLeftIcon className='mr-2' />
						<span className='font-bold'>Back Home</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
