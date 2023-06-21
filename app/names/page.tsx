import React from "react";

import { NamesTable } from "./names-table";

export default async function NamesPage() {
	return (
		<div className="container mx-auto py-10">
			<NamesTable />
		</div>
	);
}
