"use client";

import type { SortingState, PaginationState } from "@tanstack/react-table";
import React from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetNamesQuery } from "../../hooks/useGetNamesQuery";

export const NamesTable = () => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});
	const [totalPages, setTotalPages] = React.useState<number>(0);

	const { data } = useGetNamesQuery(sorting, pagination, setTotalPages);
	// Ex: {sortBy: 'peopleCount:DESC'}

	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={data}
				sorting={sorting}
				pagination={pagination}
				totalPages={totalPages}
				setSorting={setSorting}
				setPagination={setPagination}
			/>
		</div>
	);
};
