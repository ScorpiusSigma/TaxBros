import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function View({ walletAddress, type }) {
	const [tax, setTaxes] = useState([]);
	const api = ["getTaxReports", "getReceivables", "getExpenses"];
	const [loader, setLoader] = useState(false);

	const getTaxReports = async () => {
		setTaxes([]);
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
				setLoader(false);
				setTaxes([
					{
						blockNumber: "15307181",
						timeStamp: "1660036856",
						hash: "0x04d5df5dff09627827dbf078f3bc216bef90c23abdbf2c45631de4dc302e42ec",
						nonce: "196660",
						blockHash:
							"0x978dabae5ab00624161138243c26d484d6a30989a428e3883445c4b72ad36d91",
						transactionIndex: "61",
						from: "0x151b381058f91cf871e7ea1ee83c45326f61e96d",
						to: "0xf396b0385fac34992e96263256b1ffc02d21b5fc",
						value: "17100000000000000",
						gas: "21000",
						gasPrice: "10835680744",
						isError: "0",
						txreceipt_status: "1",
						input: "0x",
						contractAddress: "",
						cumulativeGasUsed: "4527635",
						gasUsed: "21000",
						confirmations: "396767",
						methodId: "0x",
						functionName: "",
						usd: "29.66",
						eth: 0.0171,
						type: "Expense",
						humantimeStamp: "09 Aug 2022 17:20",
					},
					{
						blockNumber: "15307181",
						timeStamp: "1660036856",
						hash: "0x04d5df5dff09627827dbf078f3bc216bef90c23abdbf2c45631de4dc302e42ec",
						nonce: "196660",
						blockHash:
							"0x978dabae5ab00624161138243c26d484d6a30989a428e3883445c4b72ad36d91",
						transactionIndex: "61",
						from: "0x151b381058f91cf871e7ea1ee83c45326f61e96d",
						to: "0xf396b0385fac34992e96263256b1ffc02d21b5fc",
						value: "17100000000000000",
						gas: "21000",
						gasPrice: "10835680744",
						isError: "0",
						txreceipt_status: "1",
						input: "0x",
						contractAddress: "",
						cumulativeGasUsed: "4527635",
						gasUsed: "21000",
						confirmations: "396767",
						methodId: "0x",
						functionName: "",
						usd: "29.66",
						eth: 0.0171,
						type: "Receivable",
						humantimeStamp: "09 Aug 2022 17:20",
					},
				]);
			});
	};

	useEffect(() => {
		getTaxReports();
	}, [type]);

	return <TaxTable walletAddress={walletAddress} data={tax} loader={loader} />;
}

const TaxTable = ({ data, loader, walletAddress }) => {
	const { taxables, setTaxables } = useContext(GlobalContext);

	const titles = [
		"Date",
		"Method",
		"Eth Value",
		"USD Value",
		"",
		"To",
		"Select",
	];

	const handleSelect = (hash) => {
		let isNewWallet =
			taxables.filter((tax) => tax.walletAddress === walletAddress).length ===
			0;

		if (isNewWallet) {
			taxables.push({
				walletAddress: walletAddress,
				hashes: [hash],
			});
		} else {
			taxables = taxables.map((tax) => {
				if (tax.walletAddress === walletAddress) {
					const tempHashes = tax.hashes;
					if (tempHashes.includes(hash))
						tax.hashes = tempHashes.filter((h) => h !== hash);
					else tax.hashes.push(hash);
				}
				return tax;
			});
		}
		setTaxables([...taxables]);
	};

	const isChecked = (hash) => {
		const bool = taxables
			.filter((tax) => tax.walletAddress === walletAddress)[0]
			?.hashes.includes(hash);
		return bool;
	};

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
						return (
							<tr key={index}>
								{type === "Expense" ? (
									<ExpenseType
										isChecked={isChecked}
										handleSelect={handleSelect}
										data={data}
									/>
								) : (
									<ReceivableType
										isChecked={isChecked}
										handleSelect={handleSelect}
										data={data}
									/>
								)}
							</tr>
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

const ExpenseType = ({ data, handleSelect, isChecked }) => {
	const { humantimeStamp, type, eth, usd, to, hash } = data;
	return (
		<>
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
			<td className="py-3 px-5 flex">
				<input
					type="checkbox"
					onChange={() => handleSelect(hash)}
					checked={isChecked(hash)}
				/>
			</td>
		</>
	);
};

const ReceivableType = ({ data, handleSelect, isChecked }) => {
	const { humantimeStamp, type, eth, usd, hash } = data;
	return (
		<>
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
			<td className="py-3 px-5 flex">
				<input
					type="checkbox"
					onChange={() => handleSelect(hash)}
					checked={isChecked(hash)}
				/>
			</td>
		</>
	);
};
