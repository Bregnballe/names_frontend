"use client";

import type { SortingState } from "@tanstack/react-table";
import React from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetNamesQuery } from "../../hooks/useGetNamesQuery";

export const NamesTable = () => {
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const { names } = useGetNamesQuery(sorting);

	// Ex: {sortBy: 'peopleCount:DESC'}

	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={names}
				sorting={sorting}
				setSorting={setSorting}
			/>
		</div>
	);
};

/*	const { names } = useGetNamesQuery({
		sortBy: sorting.map((s) => `${s.id}:${s.desc ? "DESC" : "ASC"}`).join(","),
	});
*/
