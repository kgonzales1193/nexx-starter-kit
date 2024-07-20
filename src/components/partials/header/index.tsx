"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Bounded from "@/components/Bounded";
import { marketingConfig } from "@/config/marketing";

export const Header = () => {
	const { data: session, status } = useSession();
	const pathname = usePathname();
	const { scrollY } = useScroll();
	const [scrolled, setScrolled] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest > 0 && !scrolled) {
			setScrolled(true);
		} else if (latest === 0 && scrolled) {
			setScrolled(false);
		}
	});

	const onClickSignOut = () => {
		signOut();
	};

	return (
		<Bounded
			as={"header"}
			className={cn(
				"sticky inset-0 z-30 border-b transition-all duration-500 py-2 lg:py-3",
				scrolled ? "shadow-md backdrop-blur-xl" : "bg-transparent"
			)}>
			<div className='flex items-center justify-between'>
				<div className='flex items-center justify-center space-x-10'>
					{/* LOGO */}
					<Link href='/'>
						<h1 className='text-2xl lg:text-3xl font-extrabold drop-shadow-md'>
							NexX
						</h1>
					</Link>
				</div>
				<div className='hidden lg:flex'>
					{/* NAVIGATION */}
					<nav>
						<ul className='flex space-x-6 capitalize'>
							{marketingConfig.mainNav.map((item, index) => (
								<li key={index}>
									<Link href={item.href}>
										<span
											className={cn(
												"flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
												pathname === item.href
													? "border-b-2 border-primary/75"
													: "hover:text-primary text-muted-foreground transition-colors duration-200"
											)}>
											{item.title}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<div className='hidden lg:flex items-center space-x-4'>
					{/* BUTTONS */}
					<ModeToggle />
					{status === "authenticated" ? (
						session.user.role === "ADMIN" ? (
							<Link
								href='/admin/dashboard'
								className={cn(
									buttonVariants({ variant: "default", size: "sm" })
								)}>
								Dashboard
							</Link>
						) : (
							<Button onClick={onClickSignOut}>Sign Out</Button>
						)
					) : (
						<Link
							href='/auth/sign-in'
							className={cn(
								buttonVariants({ variant: "default", size: "sm" })
							)}>
							Sign In
						</Link>
					)}
				</div>
				<div className='lg:hidden flex items-center justify-center gap-3'>
					<ModeToggle />
					{status === "authenticated" ? (
						session.user.role === "ADMIN" ? (
							<Link
								href='/admin/dashboard'
								className={cn(
									buttonVariants({ variant: "default", size: "sm" })
								)}>
								Dashboard
							</Link>
						) : (
							<Button onClick={onClickSignOut}>Sign Out</Button>
						)
					) : (
						<Link
							href='/auth/sign-in'
							className={cn(
								buttonVariants({ variant: "default", size: "sm" })
							)}>
							Sign In
						</Link>
					)}
					<MobileNav />
				</div>
			</div>
		</Bounded>
	);
};
