import { Inter as FontSans } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "./theme-provider";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontHeading = LocalFont({
	src: "../assets/fonts/CalSans-SemiBold.woff2",
	variable: "--font-heading",
});

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		"Next.js",
		"React",
		"Tailwind CSS",
		"Server Components",
		"Radix UI",
	],
	authors: [
		{
			name: "keiprojects",
			url: "https://keiprojects.com",
		},
	],
	creator: "keiprojects",

	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [`${siteConfig.url}/og.jpg`],
		creator: "@kgonzales1193",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
					fontHeading.variable
				)}>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
