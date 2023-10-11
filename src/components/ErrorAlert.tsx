import XCircleIcon from "@heroicons/react/20/solid/XCircleIcon";

type ErrorAlertProps = {
	message: string;
};

export default function ErrorAlert({ message }: ErrorAlertProps) {
	return (
		<div className="rounded-md bg-red-50 p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					<XCircleIcon
						className="h-5 w-5 text-red-400"
						aria-hidden="true"
					/>
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-medium text-red-800">
						An error occured
					</h3>
					<div className="mt-2 text-sm text-red-700">
						<p>{message}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
