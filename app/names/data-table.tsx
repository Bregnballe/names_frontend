"use client";

import * as React from "react";

import type {
	ColumnDef,
	OnChangeFn,
	SortingState,
} from "@tanstack/react-table";

import {
	flexRender,
	getCoreRowModel,
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
	setSorting?: OnChangeFn<SortingState>;
}

export const DataTable = <TData, TValue>({
	data,
	columns,
	isLoading,
	sorting,
	setSorting,
}: DataTableProps<TData, TValue>) => {
	const memoizedData = React.useMemo(() => data, [data]);
	const memoizedColumns = React.useMemo(() => columns, [columns]);

	const table = useReactTable({
		data: memoizedData,
		columns: memoizedColumns,
		getCoreRowModel: getCoreRowModel(),
		//getSortedRowModel: getSortedRowModel(),
		//onColumnFiltersChange: setColumnFilters,
		//getFilteredRowModel: getFilteredRowModel(),

		manualSorting: true,
		onSortingChange: setSorting,

		//manualPagination: true,
		//onPaginationChange: setPagination,

		//manualFiltering: true,
		//onGlobalFilterChange: setSearch,

		//pageCount:
		state: {
			sorting,
			//pagination,
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
		</div>
	);
};
