"use client";

import qs from "qs";
//used to more easily create the query string for the api call
import { useQuery } from "@tanstack/react-query";

import type { SortingState, PaginationState } from "@tanstack/react-table";

export const useGetNamesQuery = (
	sortBy: SortingState,
	pagination: PaginationState,
	setTotalPages: (totalPages: number) => void
	//onError: (error: Error) => void,
	//onSuccess: (data: NameObject[]) => void
) => {
	const getNames = async (
		sortBy: SortingState,
		pagination: PaginationState
	) => {
		const sortString = sortBy[0]?.desc === true ? "-" : "";
		const sortObject = sortBy[0]?.id
			? { sort: sortString + sortBy[0]?.id }
			: {};

		const stringifiedQuery = qs.stringify({
			...sortObject,
			limit: pagination.pageSize,
			page: pagination.pageIndex + 1,
		});

		const response = await fetch(
			`http://localhost:3000/api/names?${stringifiedQuery}`
		);

		const data = await response.json();
		setTotalPages(data.totalPages);
		console.log(pagination.pageIndex, data.totalPages);
		return data.docs;
	};

	// REACT QUERY
	const { data, isPreviousData } = useQuery({
		queryKey: ["names", sortBy, pagination],
		queryFn: () => getNames(sortBy, pagination),
		keepPreviousData: true,
	});

	return { data, isPreviousData };
};
