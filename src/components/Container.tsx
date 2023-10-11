import { ReactNode } from "react";

type ContainerProps = {
	children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
			<div className="mx-auto max-w-3xl">{children}</div>
		</div>
	);
}
