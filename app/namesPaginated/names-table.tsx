"use client";

import type { SortingState, PaginationState } from "@tanstack/react-table";
import React from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table-paginated";
import { useGetNamesQuery } from "../../hooks/useGetNamesQuery";

export const NamesTable = () => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [totalPages, setTotalPages] = React.useState<number>(0);

	const { data } = useGetNamesQuery(sorting, pagination, setTotalPages);
	// Ex: {sortBy: 'peopleCount:DESC'}

	console.log("data in table", data);
	console.log("total pages in table", totalPages);
	console.log(typeof Number(totalPages));
	//console.log("total pages in table", totalPages);

	const numOfPages = 5;

	return (
		<DataTable
			columns={columns}
			data={data}
			sorting={sorting}
			pagination={pagination}
			totalPages={numOfPages}
			setSorting={setSorting}
			setPagination={setPagination}
			// for infinite scrolling
			//className="container"
			//fetchMoreOnBottomReached={fetchMoreOnBottomReached}
			//ref={tableContainerRef}
		/>
	);
};
