"use client";
import React from "react";

import { NamesTable } from "./names-table";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export default async function NamesPage() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="container mx-auto py-10">
				<NamesTable />
			</div>
		</QueryClientProvider>
	);
}
