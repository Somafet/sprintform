import Transaction from "../types/transaction";
import CategorySelect from "./CategorySelect";

type TransactionEditCreateFormProps = {
	transaction: Transaction | null;
};

export default function TransactionEditCreateForm({
	transaction
}: TransactionEditCreateFormProps) {
	return (
		<form>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						{transaction ? "Edit" : "Create"} transaction
					</h2>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						{transaction && (
							<div className="sm:col-span-4">
								<label
									htmlFor="transaction-id"
									className="block text-sm font-medium leading-6 text-gray-900">
									Transaction Id
								</label>
								<div className="mt-2">
									<input
										disabled
										type="text"
										name="transaction-id"
										id="transaction-id"
										defaultValue={transaction.id}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						)}
						<div className="sm:col-span-4">
							<CategorySelect
								defaultValue={
									transaction?.category ?? "housing"
								}
							/>
						</div>

						<div className="sm:col-span-4">
							<label
								htmlFor="summary"
								className="block text-sm font-medium leading-6 text-gray-900">
								Summary
							</label>
							<div className="mt-2">
								<input
									defaultValue={transaction?.summary ?? ""}
									id="summary"
									name="summary"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="price"
								className="block text-sm font-medium leading-6 text-gray-900">
								Sum
							</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<input
									defaultValue={transaction?.sum ?? ""}
									type="text"
									name="price"
									id="price"
									className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="0.00"
								/>
								<div className="absolute inset-y-0 right-0 flex items-center">
									<label
										htmlFor="currency"
										className="sr-only">
										Currency
									</label>
									<select
										defaultValue={
											transaction?.currency ?? "HUF"
										}
										id="currency"
										name="currency"
										className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
										<option>HUF</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					Save
				</button>
			</div>
		</form>
	);
}
