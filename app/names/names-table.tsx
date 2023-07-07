"use client";

import type { SortingState, PaginationState } from "@tanstack/react-table";
import React from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetNamesInfinityQuery } from "../../hooks/useGetNamesInfinityQuery";

export const NamesTable = () => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 30,
	});
	const [totalPages, setTotalPages] = React.useState<number>(0);

	const { data, isFetching, fetchNextPage } = useGetNamesInfinityQuery(
		sorting,
		pagination,
		setTotalPages
	);
	// Ex: {sortBy: 'peopleCount:DESC'}

	return (
		<DataTable
			columns={columns}
			data={data?.pages[0]}
			sorting={sorting}
			pagination={pagination}
			totalPages={totalPages}
			setSorting={setSorting}
			setPagination={setPagination}
			// for infinite scrolling
			//className="container"
			//fetchMoreOnBottomReached={fetchMoreOnBottomReached}
			//ref={tableContainerRef}
		/>
	);
};
