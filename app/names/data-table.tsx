"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useVirtual } from "react-virtual";

import type {
	ColumnDef,
	OnChangeFn,
	SortingState,
	PaginationState,
	Header,
} from "@tanstack/react-table";

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: undefined;
	isLoading?: boolean;
	sorting?: SortingState;
	pagination?: PaginationState;
	totalPages?: number;
	className?: string;
	ref?: React.Ref<HTMLDivElement>;
	onScroll?: React.UIEventHandler<HTMLDivElement>;
	setSorting?: OnChangeFn<SortingState>;
	setPagination?: OnChangeFn<PaginationState>;
}

export const DataTable = <TData, TValue>({
	data,
	columns,
	isLoading,
	sorting,
	pagination,
	totalPages,
	setSorting,
	setPagination,
}: DataTableProps<TData, TValue>) => {
	const memoizedData: TData[] = React.useMemo(() => data, [data]);
	const memoizedColumns = React.useMemo(() => columns, [columns]);

	const table = useReactTable({
		data: memoizedData,
		columns: memoizedColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		//getSortedRowModel: getSortedRowModel(),
		//onColumnFiltersChange: setColumnFilters,
		//getFilteredRowModel: getFilteredRowModel(),
		enableSorting: true,

		manualSorting: true,
		onSortingChange: setSorting,

		manualPagination: true,
		onPaginationChange: setPagination,

		//manualFiltering: true,
		//onGlobalFilterChange: setSearch,

		pageCount: totalPages,
		state: {
			sorting,
			pagination,
			//columnFilters,
			//globalFilter: search,
		},
	});

	const sortTable = (header: Header<TData, any>) => {
		// set the page index to 0
		table.setPageIndex(0);
		// toggle the sorting
		header.column.toggleSorting(header.column.getIsSorted() === "asc");

		window.scrollTo(0, 0);
		// Scroll to top of page
	};

	const isNoDataFound =
		!isLoading && (!memoizedData || memoizedData.length === 0);

	//NÅET HERTIL

	console.log(memoizedData);

	return (
		<div className="border bg-white dark:border-gray-700 dark:bg-gray-900 sm:rounded-xl">
			{!isNoDataFound &&
				(isLoading ? (
					<div className="flex h-full w-full items-center justify-center p-8">
						Loading...
					</div>
				) : (
					<Table className="max-h-screen overflow-y-scroll no-scrollbar">
						<TableHeader className="border-b-1 border-gray-200	">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead
												className="sticky top-0"
												key={header.id}
												colSpan={header.colSpan}
												onClick={() => sortTable(header)}
											>
												{header.isPlaceholder ? null : (
													<div
														{...{
															className: header.column.getCanSort()
																? "select-none cursor-pointer flex items-center gap-1"
																: "",
															//onClick: header.column.getToggleSortingHandler(),
														}}
													>
														<Button variant="link" size="trimmed">
															{flexRender(
																header.column.columnDef.header,
																header.getContext()
															)}
															{(() => {
																switch (header.column.getIsSorted() as string) {
																	case "asc":
																		return <ArrowUp className="ml-2 h-4 w-4" />;
																	case "desc":
																		return (
																			<ArrowDown className="ml-2 h-4 w-4" />
																		);
																	default:
																		return (
																			<ArrowUpDown className="ml-2 h-4 w-4" />
																		);
																}
															})()}
														</Button>
													</div>
												)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										);
									})}
								</TableRow>
							))}
						</TableBody>
					</Table>
				))}
		</div>
	);
};
