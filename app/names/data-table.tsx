"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import type {
	ColumnDef,
	OnChangeFn,
	SortingState,
	PaginationState,
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
	data: TData[];
	isLoading?: boolean;
	sorting?: SortingState;
	pagination?: PaginationState;
	totalPages?: number;
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
	const memoizedData = React.useMemo(() => data, [data]);
	const memoizedColumns = React.useMemo(() => columns, [columns]);

	const table = useReactTable({
		data: memoizedData,
		columns: memoizedColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		//getSortedRowModel: getSortedRowModel(),
		//onColumnFiltersChange: setColumnFilters,
		//getFilteredRowModel: getFilteredRowModel(),

		manualSorting: true,
		onSortingChange: setSorting,

		manualPagination: true,
		onPaginationChange: setPagination,

		//manualFiltering: true,
		//onGlobalFilterChange: setSearch,

		//pageCount:
		state: {
			sorting,
			pagination,
			//columnFilters,
			//globalFilter: search,
		},
	});

	const isNoDataFound =
		!isLoading && (!memoizedData || memoizedData.length === 0);

	//NÅET HERTIL

	return (
		<div className="relative overflow-hidden border bg-white dark:border-gray-700 dark:bg-gray-900 sm:rounded-xl">
			{!isNoDataFound &&
				(isLoading ? (
					<div className="flex h-full w-full items-center justify-center p-8">
						Loading...
					</div>
				) : (
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id} colSpan={header.colSpan}>
												{header.isPlaceholder ? null : (
													<div
														{...{
															className: header.column.getCanSort()
																? "select-none cursor-pointer flex items-center gap-1"
																: "",
															onClick: header.column.getToggleSortingHandler(),
														}}
													>
														{flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
														{{
															asc: <p className="h-4 w-4">U</p>,
															desc: <p className="h-4 w-4">D</p>,
														}[header.column.getIsSorted() as string] ?? null}
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
			<div className="flex items-center justify-end space-x-2 p-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.setPageIndex(0)}
					disabled={pagination?.pageIndex === 0}
				>
					First
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={pagination?.pageIndex >= totalPages! - 1}
					//disabled={!table.getCanNextPage()}
					// THIS PRODUCES ERROR
				>
					Next
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.setPageIndex(totalPages! - 1)}
					disabled={pagination?.pageIndex === totalPages! - 1}
					//disabled={pagination?.pageIndex === table.getPageCount() - 1}
					// getPageCount does not work
				>
					Last
				</Button>
			</div>
		</div>
	);
};
