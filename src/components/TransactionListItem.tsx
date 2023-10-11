import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Transaction, { TransactionCategory } from "../types/transaction";
import classNames from "../utils/classNames";
import { dateFormatter, currencyFormatter } from "../utils/formatters";
import {
	EllipsisVerticalIcon,
	AcademicCapIcon,
	BuildingLibraryIcon,
	CurrencyEuroIcon,
	FaceSmileIcon,
	FilmIcon,
	GlobeEuropeAfricaIcon,
	HeartIcon,
	ShoppingCartIcon,
	Squares2X2Icon,
	WrenchScrewdriverIcon,
	HomeModernIcon
} from "@heroicons/react/24/outline";

const transactionCategoryIconMap: Record<
	TransactionCategory,
	React.ForwardRefExoticComponent<
		Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
			title?: string | undefined;
			titleId?: string | undefined;
		} & React.RefAttributes<SVGSVGElement>
	>
> = {
	housing: HomeModernIcon,
	entertainment: FilmIcon,
	financial: CurrencyEuroIcon,
	food: ShoppingCartIcon,
	healthcare: HeartIcon,
	insurance: BuildingLibraryIcon,
	lifestyle: FaceSmileIcon,
	travel: GlobeEuropeAfricaIcon,
	miscellaneous: Squares2X2Icon,
	utilities: WrenchScrewdriverIcon,
	clothing: AcademicCapIcon
};

export default function TransactionListItem({
	transaction,
	onEdit
}: {
	transaction: Transaction;
	onEdit?: (transaction: Transaction) => void;
}) {
	const TransactionIcon = transactionCategoryIconMap[transaction.category];
	return (
		<li
			key={transaction.id}
			className="bg-white px-4 shadow sm:rounded-md sm:px-6 border-l-2 flex gap-x-6 py-5">
			<div className="flex min-w-0 gap-x-4">
				{TransactionIcon && <TransactionIcon className="h-6 w-6" />}
				<div className="min-w-0 flex-auto">
					<p className="text-sm font-semibold leading-6 text-gray-900">
						{transaction.summary}
					</p>
					<p className="mt-1 flex text-xs leading-5 text-gray-500">
						{dateFormatter(transaction.paid)}
					</p>
				</div>
			</div>
			<div className="flex shrink-0 items-center gap-x-6 ml-auto">
				<div className="hidden sm:flex sm:flex-col sm:items-end">
					<p className="text-sm leading-6 text-gray-900">
						{currencyFormatter(
							transaction.sum,
							transaction.currency
						)}
					</p>
				</div>
			</div>
			<Menu as="div" className="relative flex-none z-10">
				<Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
					<span className="sr-only">Open options</span>
					<EllipsisVerticalIcon
						className="h-5 w-5"
						aria-hidden="true"
					/>
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95">
					<Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={() => onEdit?.(transaction)}
									className={classNames(
										active ? "bg-gray-50" : "",
										"block px-3 py-1 text-sm leading-6 text-gray-900 w-full"
									)}>
									Edit
									<span className="sr-only">
										, {transaction.summary}
									</span>
								</button>
							)}
						</Menu.Item>
					</Menu.Items>
				</Transition>
			</Menu>
		</li>
	);
}
