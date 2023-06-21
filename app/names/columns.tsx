"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
			return (
				<Button
					variant="link"
					size="trimmed"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "peopleCount",
		header: ({ column }) => {
			return (
				<Button
					variant="link"
					size="trimmed"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					People
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "trendCount",
		header: ({ column }) => {
			return (
				<Button
					variant="link"
					size="trimmed"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Trend
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "maleGender",
		header: ({ column }) => {
			return (
				<Button
					variant="link"
					size="trimmed"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Male
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "femaleGender",
		header: ({ column }) => {
			return (
				<Button
					variant="link"
					size="trimmed"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Female
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
];
