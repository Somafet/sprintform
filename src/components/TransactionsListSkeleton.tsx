type TransactionsListSkeletonProps = {
	numberOfRows?: number;
};
export default function TransactionsListSkeleton({
	numberOfRows = 10
}: TransactionsListSkeletonProps) {
	return (
		<>
			<div
				role="status"
				className="space-y-4 divide-y divide-gray-200 animate-pulse">
				{Array(numberOfRows)
					.fill(null)
					.map((_, i) => (
						<div
							key={i}
							className="overflow-hidden bg-white px-4 shadow sm:rounded-md sm:px-6 border-l-2 flex justify-between gap-x-6 py-5">
							<div>
								<div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
								<div className="w-32 h-2 bg-gray-200 rounded-full"></div>
							</div>
							<div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
						</div>
					))}
				<span className="sr-only">Loading...</span>
			</div>
		</>
	);
}
