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
		pageSize: 10,
	});

	const { names } = useGetNamesQuery(sorting, pagination);
	// Ex: {sortBy: 'peopleCount:DESC'}

	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={names}
				sorting={sorting}
				pagination={pagination}
				setSorting={setSorting}
				setPagination={setPagination}
			/>
		</div>
	);
};
