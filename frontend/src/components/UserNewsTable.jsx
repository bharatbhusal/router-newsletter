import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "date", headerName: "Date", width: 100 },
	{ field: "headline", headerName: "Headline", width: 150 },
	{ field: "summary", headerName: "Summary", width: 200 },
	{
		field: "source",
		headerName: "Source",
		width: 200,
		renderCell: (params) => (
			<a
				href={params.value}
				target="_blank"
				rel="noopener noreferrer"
			>
				{params.value}
			</a>
		),
	},
];

export default function DataTable({ rows }) {
	rows.forEach((each) => {
		each.id = each._id;
		delete each._id;
		delete each.reporter;
		delete each.updatedAt;
		delete each.createdAt;
		delete each._v;
		each.date = `${each.date.year}-${each.date.month}-${each.date.day}`;
	});

	return (
		<div style={{ height: "80vh", width: "100%" }}>
			<DataGrid
				style={{ border: "1px solid black", marginTop: "1rem" }}
				rows={rows}
				columns={columns}
				initialSortModel={[{ field: "date", sort: "desc" }]}
				pagination
			/>
		</div>
	);
}
