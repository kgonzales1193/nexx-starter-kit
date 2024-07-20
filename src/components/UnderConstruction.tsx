import Image from "next/image";

export const UnderConstruction = () => {
	return (
		<div className='min-h-[80dvh] flex flex-col items-center justify-center gap-4'>
			<Image
				src='/under-construction.svg'
				width='800'
				height='800'
				className='object-cover'
				alt='under construction'
			/>
			<h1 className='font-bold text-5xl'>
				Oops! We are still working on this page.
			</h1>
			<p className='font-medium text-lg text-muted-foreground'>
				We are sorry for the inconvenience. Please check back later.
			</p>
		</div>
	);
};
