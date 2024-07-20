import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<div>{children}</div>
		</SessionProvider>
	);
}
