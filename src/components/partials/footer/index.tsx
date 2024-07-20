import { siteConfig } from "@/config/site";
import { Icon } from "@iconify/react";
import Link from "next/link";

async function getGitHubStars(): Promise<string | null> {
	try {
		const response = await fetch(
			"https://api.github.com/repos/kgonzales1193/nexx-starter-kit",
			{
				headers: {
					Accept: "application/vnd.github.v3+json",
					Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
				},
			}
		);

		if (!response?.ok) {
			return null;
		}

		const json = await response.json();

		return json["stargazers_count"].toLocaleString();
	} catch (error) {
		return null;
	}
}

export default async function Footer() {
	const stars = await getGitHubStars();
	return (
		<section id='open-source' className='container py-8 md:py-12 lg:py-24'>
			<div className='mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center'>
				<h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
					Proudly Open Source
				</h2>
				<p className='max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
					NexX Starter Kit is open source and powered by open source software.{" "}
					<br /> The code is available on{" "}
					<Link
						href={siteConfig.links.github}
						target='_blank'
						rel='noreferrer'
						className='underline underline-offset-4'>
						GitHub
					</Link>
					.{" "}
				</p>
				{stars && (
					<Link
						href={siteConfig.links.github}
						target='_blank'
						rel='noreferrer'
						className='flex'>
						<div className='flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted'>
							<Icon icon='mdi:github' width='24' height='24' />
						</div>
						<div className='flex items-center'>
							<div className='h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent'></div>
							<div className='flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium'>
								{stars === "1"
									? `${stars} star on GitHub`
									: `${stars} stars on GitHub`}
							</div>
						</div>
					</Link>
				)}
			</div>
		</section>
	);
}
