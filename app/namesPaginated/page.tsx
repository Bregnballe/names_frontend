"use client";
import React from "react";

import { NamesTable } from "./names-table";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

export default async function NamesPage() {
	return (
		<QueryClientProvider client={queryClient}>
			<NamesTable />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
