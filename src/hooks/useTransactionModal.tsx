import { useContext } from "react";
import { TransactionModalContext } from "../context/transaction-modal.context";

const useTransactionModal = () => {
	const context = useContext(TransactionModalContext);

	if (context === null) {
		throw new Error(
			"useTransactionModal must be used within a SnackbarNotificationProvider."
		);
	}
	return context;
};

export default useTransactionModal;
