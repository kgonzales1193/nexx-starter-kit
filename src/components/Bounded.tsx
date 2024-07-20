import { cn } from "@/lib/utils";

type BoundedProps = {
	as?: React.ElementType;
	className?: string;
	children: React.ReactNode;
};

export default function Bounded({
	as: Comp = "section",
	className,
	children,
	...restProps
}: BoundedProps) {
	return (
		<Comp className={cn("py-4 lg:py-8", className)} {...restProps}>
			<div className='container mx-auto'>{children}</div>
		</Comp>
	);
}
