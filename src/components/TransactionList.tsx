import Transaction, { TransactionCategory } from "../types/transaction";
import { useMemo, useState } from "react";
import { currencyFormatter } from "../utils/formatters";
import useTransactionModal from "../hooks/useTransactionModal";
import Filters, { SortOption } from "./Filters";
import TransactionListItem from "./TransactionListItem";

type TransactionListProps = {
	transactions: Transaction[];
};

export default function TransactionList({
	transactions: initialTransactions
}: TransactionListProps) {
	const { editTransaction } = useTransactionModal();
	const [transactions, setTransactions] = useState(initialTransactions);
	const [sortBy, setSortBy] = useState<SortOption>("Category");

	const categories = useMemo(() => {
		const returnSet = new Set<TransactionCategory>();
		transactions.forEach(transaction =>
			returnSet.add(transaction.category)
		);

		return returnSet;
	}, [transactions]);

	const handleSelectedCategoriesChange = (
		selectedCategories: TransactionCategory[] | null
	) => {
		if (!selectedCategories) {
			setTransactions(initialTransactions);
		} else {
			setTransactions([
				...initialTransactions.filter(transaction =>
					selectedCategories.includes(transaction.category)
				)
			]);
		}
	};

	return (
		<>
			<Filters
				className="py-8"
				onSortByChange={setSortBy}
				onSelectedCategoriesChange={handleSelectedCategoriesChange}
			/>
			<ul className="space-y-6">
				{sortBy === "Newest" &&
					transactions
						.sort((a, b) =>
							Date.parse(a.paid) <= Date.parse(b.paid) ? 1 : -1
						)
						.map(transaction => (
							<TransactionListItem
								key={transaction.id}
								transaction={transaction}
								onEdit={editTransaction}
							/>
						))}
				{sortBy === "Category" &&
					Array.from(categories).map(category => {
						const categoryTransactions = transactions
							.filter(
								transaction => transaction.category === category
							)
							.sort((a, b) =>
								Date.parse(a.paid) <= Date.parse(b.paid)
									? 1
									: -1
							);
						const categorySum = categoryTransactions.reduce(
							(prev, transaction) => prev + transaction.sum,
							0
						);
						return (
							<div key={category}>
								<div className="flex pb-4">
									<h3 className="font-semibold text-gray-900 xl:pr-0">
										{category}
									</h3>
									<p className="ml-auto">
										{currencyFormatter(categorySum)}
									</p>
								</div>
								<div className="space-y-4">
									{categoryTransactions.map(transaction => (
										<TransactionListItem
											key={transaction.id}
											transaction={transaction}
											onEdit={editTransaction}
										/>
									))}
								</div>
							</div>
						);
					})}
			</ul>
		</>
	);
}
