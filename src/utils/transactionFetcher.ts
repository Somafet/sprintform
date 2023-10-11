import { Fetcher } from "swr";
import Transaction, { validateTransaction } from "../types/transaction";

const getTransactions = async () => {
	try {
		const response = await fetch(
			"https://development.sprintform.com/transactions.json"
		);

		if (response.status !== 200) {
			console.error("Transactions call returned not ok.");
			const errorResponse = await response.json();
			throw new Error("Error while fetching transactions", {
				cause: errorResponse
			});
		}

		const data = await response.json();
		if (Array.isArray(data)) {
			if (data.every(entry => validateTransaction(entry))) {
				return data as Transaction[]; // we already checked but ts doesn't recognise
			}
		}

		throw new Error("Invalid data received.", {
			cause: data
		});
	} catch (error) {
		console.error("Error while fetching transactions.", error);
		throw error;
	}
};

const transactionFetcher: Fetcher<Transaction[], string> = () =>
	getTransactions();

export default transactionFetcher;
