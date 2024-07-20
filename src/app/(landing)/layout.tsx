import { auth } from "@/auth";
import { Header } from "@/components/partials/header";
import { SessionProvider } from "next-auth/react";

export default async function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<div>
				<Header />
				{children}
			</div>
		</SessionProvider>
	);
}
