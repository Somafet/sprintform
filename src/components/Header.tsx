import sprintformLogo from "../sprintform-logo.png";

export default function Header() {
	return (
		<header className="bg-primary-950">
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
				aria-label="Global">
				<div className="flex items-center gap-x-12">
					<a href="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Sprintform</span>
						<img
							className="h-8 w-auto"
							src={sprintformLogo}
							alt="Sprintform Logo"
						/>
					</a>
				</div>
			</nav>
		</header>
	);
}
