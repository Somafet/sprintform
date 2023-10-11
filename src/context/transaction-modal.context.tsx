import { ReactNode, createContext, useCallback, useState } from "react";
import Transaction from "../types/transaction";
import Modal from "../components/Modal";
import TransactionEditCreateForm from "../components/TransactionEditCreateFrom";

type TransactionModalContextState = {
	show: boolean;
	transaction: Transaction | null;
	editTransaction: (transaction: Transaction) => void;
	showModal: (value: boolean) => void;
};

const TransactionModalContext = createContext<TransactionModalContextState>({
	show: false,
	transaction: null,
	editTransaction: (_: Transaction) => {},
	showModal: (_: boolean) => {}
});

const TransactionModalProvider = ({ children }: { children: ReactNode }) => {
	const [show, setShow] = useState<boolean>(false);
	const [transaction, setTransaction] = useState<Transaction | null>(null);

	const handleClose = useCallback(() => {
		setShow(false);
		setTransaction(null);
	}, [setShow, setTransaction]);

	const editTransaction = useCallback(
		(transaction: Transaction) => {
			setShow(true);
			setTransaction(transaction);
		},
		[setShow, setTransaction]
	);

	const showModal = useCallback(
		(value: boolean) => {
			setShow(value);
		},
		[setShow]
	);

	return (
		<TransactionModalContext.Provider
			value={{ show, transaction, editTransaction, showModal }}>
			<Modal show={show} onClose={handleClose}>
				<TransactionEditCreateForm transaction={transaction} />
			</Modal>
			{children}
		</TransactionModalContext.Provider>
	);
};

export { TransactionModalProvider, TransactionModalContext };
