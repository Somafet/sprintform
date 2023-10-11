import useSWR from "swr";
import Container from "./components/Container";
import Header from "./components/Header";
import transactionFetcher from "./utils/transactionFetcher";
import TransactionsListSkeleton from "./components/TransactionsListSkeleton";
import TransactionList from "./components/TransactionList";
import ErrorAlert from "./components/ErrorAlert";
import Transaction from "./types/transaction";

import { PlusIcon } from "@heroicons/react/20/solid";
import useTransactionModal from "./hooks/useTransactionModal";

function App() {
	const { data, isLoading, error } = useSWR<Transaction[], Error>(
		"initial_fetch",
		transactionFetcher
	);
	const { showModal } = useTransactionModal();

	return (
		<>
			<div className="App">
				<Header />
				<Container>
					<div className="flex justify-end pb-4">
						<button
							onClick={() => showModal(true)}
							type="button"
							className="inline-flex items-center gap-x-1.5 rounded-md bg-primary-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Create Transaction
							<PlusIcon
								className="-mr-0.5 h-5 w-5"
								aria-hidden="true"
							/>
						</button>
					</div>
					{error && <ErrorAlert message={error.message} />}
					{isLoading && <TransactionsListSkeleton />}
					{data && <TransactionList transactions={data} />}
				</Container>
			</div>
		</>
	);
}

export default App;
