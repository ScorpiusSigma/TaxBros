import { useEffect, useState } from "react";

export default function TaxViewer() {
	const [tax, setTaxes] = useState([]);

	const getTaxReports = async () => {
		await fetch("/api/getTaxReports", {
			method: "POST",
			body: JSON.stringify({
				walletAddress: "0xf396b0385fac34992e96263256b1ffc02d21b5fc",
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setTaxes(data.name);
			});
	};

	useEffect(() => {
		getTaxReports();
	}, []);

	return (
		<div className="p-5 bg-gray-50 w-full h-full rounded-md text-xs overflow-auto">
			<TaxTable data={tax} />
		</div>
	);
}

const TaxTable = ({ data }) => {
	const titles = ["Date", "Method", "Eth Value", "USD Value"];
	console.log(data);
	return (
		<table className="table-auto bg-white w-full shadow-sm rounded-md">
			<thead>
				<tr>
					{titles.map((title, index) => (
						<td key={index} className="py-2 px-5">
							{title}
						</td>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((data, index) => {
					const { humantimeStamp, type, eth, usd } = data;
					return (
						<tr key={index}>
							<td className="py-3 px-5 ">{humantimeStamp}</td>
							<td className="py-3 px-5 ">{type}</td>
							<td className="py-3 px-5 ">
								{(type === "expense" ? "- " : "") + eth} ETH
							</td>
							<td className="py-3 px-5 ">{usd}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
