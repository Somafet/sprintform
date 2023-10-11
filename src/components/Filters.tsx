import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import classNames from "../utils/classNames";
import {
	TransactionCategory,
	transactionCategories
} from "../types/transaction";

export const sortOptions = ["Category" as const, "Newest" as const];

export type SortOption = (typeof sortOptions)[number];

type FilterProps = {
	className?: string;
	onSortByChange?: (sortBy: SortOption) => void;
	onSelectedCategoriesChange?: (
		selectedCategories: TransactionCategory[] | null
	) => void;
};

export default function Filters({
	className,
	onSortByChange,
	onSelectedCategoriesChange
}: FilterProps) {
	const [currentSortBy, setCurrentSortBy] = useState<SortOption | null>(null);
	const [selectedCategories, setSelectedCategories] = useState<
		TransactionCategory[] | null
	>(null);

	const handleSortByChange = (option: SortOption) => {
		onSortByChange?.(option);
		setCurrentSortBy(option);
	};

	const handleCategoryChange = (
		category: TransactionCategory,
		selected: boolean
	) => {
		let newCategories: TransactionCategory[] = [];
		if (selectedCategories) {
			if (selected) {
				newCategories = [...selectedCategories, category];
			} else {
				newCategories = [
					...selectedCategories.filter(cat => cat !== category)
				];
			}
		} else {
			if (selected) {
				newCategories = [category];
			}
		}
		const finalValue = newCategories.length > 0 ? newCategories : null;
		setSelectedCategories(finalValue);
		onSelectedCategoriesChange?.(finalValue);
	};

	return (
		<>
			<div
				className={classNames(
					"flex items-center justify-between",
					className ?? ""
				)}>
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
							{currentSortBy ?? "Sort"}
							<ChevronDownIcon
								className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
								aria-hidden="true"
							/>
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95">
						<Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								{sortOptions.map(option => (
									<Menu.Item key={option}>
										{({ active }) => (
											<button
												onClick={() =>
													handleSortByChange(option)
												}
												className={classNames(
													active ? "bg-gray-100" : "",
													"block px-4 py-2 text-sm font-medium text-gray-900 w-full text-left"
												)}>
												{option}
											</button>
										)}
									</Menu.Item>
								))}
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
				<Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
					<Popover
						as="div"
						id={`desktop-menu-category`}
						className="relative inline-block text-left">
						<div>
							<Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
								<span>Category</span>

								{selectedCategories && (
									<span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
										{selectedCategories.length}
									</span>
								)}

								<ChevronDownIcon
									className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
									aria-hidden="true"
								/>
							</Popover.Button>
						</div>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95">
							<Popover.Panel className="absolute right-0 z-[100] mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
								<form className="space-y-4">
									{transactionCategories.map(
										(option, optionIdx) => (
											<div
												key={option}
												className="flex items-center">
												<input
													id={`filter-${optionIdx}`}
													name={`category[]`}
													defaultValue={option}
													defaultChecked={
														selectedCategories?.includes(
															option
														) ?? false
													}
													onChange={e =>
														handleCategoryChange(
															option,
															e.target.checked
														)
													}
													type="checkbox"
													className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
												/>
												<label
													htmlFor={`filter-${optionIdx}`}
													className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">
													{option}
												</label>
											</div>
										)
									)}
								</form>
							</Popover.Panel>
						</Transition>
					</Popover>
				</Popover.Group>
			</div>
		</>
	);
}
