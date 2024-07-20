import Bounded from "@/components/Bounded";

import Footer from "@/components/partials/footer";

import Image from "next/image";
import { Hero } from "./_components/Hero";
import { PartnersLogo } from "./_components/PartnersLogo";
import { Features } from "./_components/Features";

export default function Home() {
	return (
		<main>
			<div className='w-screen min-h-screen fixed -z-[1] flex justify-center px-6 py-10 lg:py-60 pointer-events-none dark:hidden'>
				<div className="bg-[url('/grid.svg')] h-screen absolute inset-0  opacity-25" />
				<Image
					src='/mesh.svg'
					alt='mesh'
					height={1024}
					width={1024}
					style={{ width: "auto", height: "auto" }}
					className='opacity-15 -z-[1]'
				/>
				<div className='bg-gradient-to-c from-transparent via-transparent to-white absolute inset-0 z-20' />
			</div>
			<section className='relative z-20'>
				<Hero />
				<PartnersLogo />
				<Features />
				<Footer />
			</section>
		</main>
	);
}
