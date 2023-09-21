"use client";

import type { SortingState, PaginationState } from "@tanstack/react-table";
import React from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetNamesInfinityQuery } from "../../hooks/useGetNamesInfinityQuery";

export const NamesTable = () => {
	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: "name",
			desc: false,
		},
	]);
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	});

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useGetNamesInfinityQuery(sorting, pagination);
	// Ex: {sortBy: 'peopleCount:DESC'}

	return (
		<DataTable
			columns={columns}
			data={data}
			status={status}
			error={error}
			sorting={sorting}
			pagination={pagination}
			isFetching={isFetching}
			hasNextPage={hasNextPage}
			isFetchingNextPage={isFetchingNextPage}
			setSorting={setSorting}
			setPagination={setPagination}
			fetchNextPage={fetchNextPage}

			// for infinite scrolling
			//className="container"
			//fetchMoreOnBottomReached={fetchMoreOnBottomReached}
			//ref={tableContainerRef}
		/>
	);
};
