"use client";

import * as React from "react";

import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { Button } from "./button";

export function ModeToggle() {
	const { resolvedTheme, theme, setTheme } = useTheme();

	return (
		<Button
			variant='outline'
			size='icon'
			className='rounded-full'
			onClick={() => {
				setTheme(resolvedTheme === "dark" ? "light" : "dark");
			}}>
			{theme === "dark" ? (
				<Icon
					icon={"line-md:sunny-outline-loop"}
					className='h-[1.2rem] w-[1.2rem]'
				/>
			) : (
				<Icon
					icon={"line-md:moon-alt-loop"}
					className=' h-[1.2rem] w-[1.2rem]'
				/>
			)}
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
