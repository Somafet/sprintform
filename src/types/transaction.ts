export const transactionCategories = [
	"housing" as const,
	"travel" as const,
	"food" as const,
	"utilities" as const,
	"insurance" as const,
	"healthcare" as const,
	"financial" as const,
	"lifestyle" as const,
	"entertainment" as const,
	"clothing" as const,
	"miscellaneous" as const
];

export type TransactionCategory = (typeof transactionCategories)[number];

export default interface Transaction {
	id: string;
	summary: string;
	category: TransactionCategory;
	sum: number;
	currency: string;
	paid: string;
}

export function validateTransaction(value: any): value is Transaction {
	if (
		"id" in value &&
		typeof value.id === "string" &&
		"summary" in value &&
		typeof value.summary === "string" &&
		"category" in value &&
		typeof value.category === "string" &&
		"sum" in value &&
		typeof value.sum === "number" &&
		"currency" in value &&
		typeof value.currency === "string" &&
		"paid" in value &&
		typeof value.paid === "string"
	) {
		return true;
	}

	return false;
}
