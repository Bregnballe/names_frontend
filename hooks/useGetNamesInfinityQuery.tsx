"use client";

import * as React from "react";
import qs from "qs";
//used to more easily create the query string for the api call
import { useInfiniteQuery } from "@tanstack/react-query";

import type { SortingState, PaginationState } from "@tanstack/react-table";

export const useGetNamesInfinityQuery = (
	sortBy: SortingState,
	pagination: PaginationState
) => {
	// Fetching data function
	const fetchNames = async ({ sortBy, pageParam = 1 }) => {
		const sortString = sortBy[0]?.desc === true ? "-" : "";
		const sortObject = sortBy[0]?.id
			? { sort: sortString + sortBy[0]?.id }
			: {};

		const stringifiedQuery = qs.stringify({
			...sortObject,
			limit: pagination.pageSize,
			page: pageParam,
		});

		const response = await fetch(
			`http://localhost:3000/api/names?${stringifiedQuery}`
		);
		const data = await response.json();

		return data;
		/*The data object contains a lot of metadata like totalPages. data.docs contains the names data
		 */
	};

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isPreviousData,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ["names", sortBy, pagination],
		queryFn: ({ pageParam = 1 }) =>
			fetchNames({ sortBy, pagination, pageParam }),
		// This is the only way to pass PageParam along side other arguments

		getNextPageParam: (lastPage) => {
			return lastPage.hasNextPage ? lastPage.nextPage : undefined;
			// The lastPage contains the most recent data returned from the fetchNames function
			//"hasNextPage": true,
			//"nextPage": 2
		},
	});

	return {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	};
};
