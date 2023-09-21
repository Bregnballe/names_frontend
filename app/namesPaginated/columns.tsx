"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type NameObject = {
	id: string;
	name: string;
	peopleCount: number;
	trendCount: number;
	maleGender: boolean;
	femaleGender: boolean;
};
// Make a type for the response data

export const columns: ColumnDef<NameObject>[] = [
	{
		// accesorKey is the same as the key in the database
		accessorKey: "name",
		header: ({ column }) => {
			return "Name";
		},
	},
	{
		accessorKey: "peopleCount",
		header: ({ column }) => {
			return "People";
		},
	},
	{
		accessorKey: "trendCount",
		header: ({ column }) => {
			return "Trend";
		},
	},
	{
		accessorKey: "maleGender",
		header: ({ column }) => {
			return "Male";
		},
	},
	{
		accessorKey: "femaleGender",
		header: ({ column }) => {
			return "Female";
		},
	},
];
