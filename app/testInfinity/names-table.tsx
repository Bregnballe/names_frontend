"use client";

import type { SortingState, PaginationState } from "@tanstack/react-table";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

export const NamesTable = () => {
	// Fetching data function
	const fetchNames = async ({ pageParam = 1 }) => {
		const response = await fetch(
			`http://localhost:3000/api/names?limit=1&page=${pageParam}`
		);
		const data = await response.json();
		return data;
		//The data object contains a lot of metadata like totalPages. data.docs contains the names data
	};

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ["names"],
		queryFn: fetchNames,
		getNextPageParam: (lastPage) => {
			return lastPage.hasNextPage ? lastPage.nextPage : undefined;
			// The lastPage contains the most recent data returned from the fetchNames function
			//"hasNextPage": true,
			//"nextPage": 2
		},
	});

	// Return loading, error, or data
	return status === "loading" ? (
		<p>Loading...</p>
	) : status === "error" ? (
		<p>Error: {error.message}</p>
	) : (
		<>
			{/* map over the pages in the data and return the names */}
			{console.log("data", data?.pages[0]?.docs[0])}
			<table>
				<thead>
					<tr>
						{Object.keys(data?.pages[0]?.docs[0]).map((key) => (
							<th key={key} scope="col">
								{key}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data?.pages?.map((group, i) => (
						<tr key={i}>
							{group?.docs?.map((item) => (
								<>
									<td>{item.id}</td>
									<td>{item.name}</td>
									<td>{item.maleGender.toString()}</td>
									<td>{item.femaleGender.toString()}</td>
									<td>{item.peopleCount}</td>
									<td>{item.maleCount}</td>
									<td>{item.femaleCount}</td>
									<td>{item.trendCount}</td>
									<td>{item.maleTrendCount}</td>
									<td>{item.femaleTrendCount}</td>
									<td>{item.createdAt}</td>
									<td>{item.updatedAt}</td>
								</>
							))}
						</tr>
					))}
				</tbody>
				))
			</table>
			<div>
				{/* fetch next page on click. Disabled if there is no next page or is fetching */}
				<button
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || isFetchingNextPage}
				>
					{isFetchingNextPage
						? "Loading more..."
						: hasNextPage
						? "Load More"
						: "Nothing more to load"}
				</button>
			</div>
			<div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
		</>
	);
};
