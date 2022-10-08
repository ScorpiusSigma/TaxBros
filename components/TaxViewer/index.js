import { useEffect, useState } from "react";
import View from "./View";

export default function TaxViewer() {
	const [optionVal, setOptionVal] = useState(0);
	const options = [
		{ title: "Overall" },
		{ title: "Receivable" },
		{ title: "Expense" },
	];

	const handleOptionSelect = (option) => {
		setOptionVal(option);
	};

	return (
		<div className="flex flex-col gap-3 p-5 bg-gray-50 w-full h-full rounded-md text-xs overflow-auto">
			<div className="text-base w-full flex gap-5">
				{options.map((option, index) => (
					<button
						key={index}
						className={`hover:text-blue-500 ${
							optionVal === index ? "text-blue-500" : ""
						}`}
						onClick={() => handleOptionSelect(index)}
					>
						{option.title}
					</button>
				))}
			</div>
			<View
				walletAddress={"0xf396b0385fac34992e96263256b1ffc02d21b5fc"}
				type={optionVal}
			/>
		</div>
	);
}

const TaxTable = ({ data }) => {
	const titles = ["Date", "Method", "Eth Value", "USD Value", "", "To"];
	return (
		<table className="table-auto bg-white w-full shadow-sm rounded-md">
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
					const { humantimeStamp, type, eth, usd, to, hash } = data;
					return (
						<tr key={index}>
							<td className="py-3 px-5">
								<a target="_blank" href={`https://etherscan.io/tx/${hash}`}>
									{humantimeStamp}
								</a>
							</td>
							<td className="py-3 px-5">{type}</td>
							<td
								className={`py-3 px-5 ${
									type === "Expense" ? "text-red-500" : "text-green-600"
								}`}
							>
								{(type === "Expense" ? "- " : "+ ") + eth} ETH
							</td>
							<td className="py-3 px-5">{usd}</td>
							<td className={`py-3 px-5`}>{type === "Expense" && "->"}</td>
							<td className="py-3 px-5 truncate">
								<a target="_blank" href={`https://etherscan.io/address/${to}`}>
									{type === "Expense" && to}
								</a>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
