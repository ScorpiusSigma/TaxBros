import { useEffect, useState } from "react";

export default function View({ walletAddress, type }) {
	const [tax, setTaxes] = useState([]);
	const api = ["getTaxReports", "getReceivable", "getExpense"];
	const [loader, setLoader] = useState(false);

	const getTaxReports = async () => {
		setLoader(true);
		await fetch(`/api/${api[type]}`, {
			method: "POST",
			body: JSON.stringify({
				walletAddress: walletAddress,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setTaxes(data.result);
				setLoader(false);
			})
			.catch(() => {
				setTaxes([]);
				setLoader(false);
			});
	};

	useEffect(() => {
		getTaxReports();
	}, [type]);

	return <TaxTable data={tax} loader={loader} />;
}

const TaxTable = ({ data, loader }) => {
	const titles = ["Date", "Method", "Eth Value", "USD Value", "", "To"];

	return (
		<div className="flex flex-col bg-white w-full shadow-sm rounded-md">
			<table className="table-auto w-full">
				<thead className="font-bold">
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
						const { type } = data;
						return type === "Expense" ? (
							<ExpenseType index={index} data={data} />
						) : (
							<ReceivableType index={index} data={data} />
						);
					})}
					{loader && <Loader />}
				</tbody>
			</table>
			{data.length === 0 && !loader && (
				<div className="text-center w-full py-2 px-5">No data to display</div>
			)}
		</div>
	);
};

const Loader = () => {
	return (
		<tr>
			{[...Array(6)].map((x, index) => (
				<td key={index} className="py-3 px-5">
					<span className="block w-full h-4 rounded-md bg-gray-100 animate-pulse" />
				</td>
			))}
		</tr>
	);
};

const ExpenseType = ({ data, index }) => {
	const { humantimeStamp, type, eth, usd, to, hash } = data;
	return (
		<tr key={index}>
			<td className="py-3 px-5">
				<a
					className="text-blue-500"
					target="_blank"
					href={`https://etherscan.io/tx/${hash}`}
				>
					{humantimeStamp}
				</a>
			</td>
			<td className="py-3 px-5">{type}</td>
			<td className="py-3 px-5 text-red-500">- {eth} ETH</td>
			<td className="py-3 px-5">{usd}</td>
			<td className="py-3 px-5">{"->"}</td>
			<td className="py-3 px-5">
				<a
					className="text-blue-500"
					target="_blank"
					href={`https://etherscan.io/address/${to}`}
				>
					{to}
				</a>
			</td>
		</tr>
	);
};

const ReceivableType = ({ data, index }) => {
	const { humantimeStamp, type, eth, usd, hash } = data;
	return (
		<tr key={index}>
			<td className="py-3 px-5">
				<a
					className="text-blue-500"
					target="_blank"
					href={`https://etherscan.io/tx/${hash}`}
				>
					{humantimeStamp}
				</a>
			</td>
			<td className="py-3 px-5">{type}</td>
			<td className="py-3 px-5 text-green-600">+ {eth} ETH</td>
			<td className="py-3 px-5">{usd}</td>
			<td className={`py-3 px-5`} />
			<td className="py-3 px-5" />
		</tr>
	);
};
