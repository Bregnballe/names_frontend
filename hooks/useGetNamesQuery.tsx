"use client";

import { useState, useEffect } from "react";
import qs from "qs";
//used to more easily create the query string for the api call
import type { SortingState, PaginationState } from "@tanstack/react-table";

import { NameObject } from "../app/names/columns";

export const useGetNamesQuery = (
	sortBy: SortingState,
	pagination: PaginationState
) => {
	const [names, setNames] = useState<NameObject[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	// GENERAL FETCH API DATA
	const getNames = async (sortId: string | undefined, sortDesc: boolean) => {
		console.log("Getting data");

		const sortString =
			sortDesc === true ? "?sort=-" : sortDesc === false ? "?sort=" : "";
		const idString = sortId === undefined ? "" : sortId;
		//make strings for our api call based on the sort parameters passed to this hook

		try {
			setIsLoading(true);
			const response = await fetch(
				`http://localhost:3000/api/names${sortString + idString}`
			);
			//{signal: controller.signal});
			const data = await response.json();
			return data.docs;
		} catch (err) {
			if (err.name === "AbortError") {
				// handle abort()
				console.error(err);
				return [];
			} else {
				throw err;
			}
		}
	};

	// FETCH API DATA ON INITIAL RENDER & SORT CHANGE
	useEffect(() => {
		const fetchInitialData = async () => {
			console.log(sortBy[0]?.id, sortBy[0]?.desc);
			console.log(pagination.pageIndex, pagination.pageSize);
			// Kommet hertil
			const initialNames: NameObject[] = await getNames(
				sortBy[0]?.id,
				sortBy[0]?.desc
			);
			initialNames ? setNames(initialNames) : setNames([]);
			setIsLoading(false);
		};

		fetchInitialData();
	}, [sortBy]);

	return { names, isLoading };
};
//https://localhost:3000/api/posts?sort=-createdAt

/*
const getNames = async function() {
    const response = await fetch('http://localhost:3000/api/names/')
    const data = await response.json()
    return data.docs
}
// Make a function to get the data from the API


export default async function NamesPage() {
    const names: NameObject[] = await getNames();
    // Get the data from the API


    	const response = await fetch(
				`http://localhost:3000/api/names?sort=${sortingString}createdAt`
			);


id: sorting[0]?.id,
sortBy: sorting[0]?.desc,
*/
