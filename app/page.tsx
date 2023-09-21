import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
				<ul>
					<li>
						<Link href="/names">names</Link>
					</li>
					<li>
						<Link href="/namesPaginated">namesPaginated</Link>
					</li>
					<li>
						<Link href="/namesInfinity">namesInfinity</Link>
					</li>
					<li>
						<Link href="/testInfinity">testInfinity</Link>
					</li>
				</ul>
			</div>
		</main>
	);
}
