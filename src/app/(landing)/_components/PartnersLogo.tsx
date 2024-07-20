"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { partnersLogo } from "@/data-access/partners";

export function PartnersLogo() {
	return (
		<div className='h-[200px] rounded-md flex flex-col items-center justify-center relative overflow-hidden'>
			<InfiniteMovingCards
				items={partnersLogo}
				direction='right'
				speed='slow'
			/>
		</div>
	);
}
