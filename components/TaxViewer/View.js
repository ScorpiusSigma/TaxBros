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
				walletAddress: [walletAddress],
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setTaxes(data.result);
				setLoader(false);
			})
			.catch(() => {
				setLoader(false);
				setTaxes([]);
			});
	};

	useEffect(() => {
		getTaxReports();
	}, [type, walletAddress]);

	return <TaxTable walletAddress={walletAddress} data={tax} loader={loader} />;
}

const TaxTable = ({ data, loader, walletAddress }) => {
	const { taxables, setTaxables } = useContext(GlobalContext);
	const [selectAll, setSelectAll] = useState(false);

	const titles = [
		"Date",
		"Method",
		"Eth Value",
		"USD Value",
		"",
		"To",
		<span key={6} className="flex items-center gap-2">
			Select{" "}
			<input
				type="checkbox"
				onChange={() => handleSelect("")}
				checked={selectAll}
			/>
		</span>,
	];

	const checkAllIsSelected = () => {
		const test = (hash) =>
			taxables
				.filter((tax) => tax.walletAddress === walletAddress)[0]
				?.hashes.includes(hash);

		const doesNotInclude = data.filter((el) => !test(el.hash)).length > 0;

		if (doesNotInclude) {
			setSelectAll(false);
			return;
		}

		setSelectAll(true);
	};

	const handleSelect = (hash) => {
		if (hash === "") {
			const allTax = { walletAddress: walletAddress, hashes: [] };
			data.map((tax) => {
				allTax.hashes.push(tax.hash);
			});

			const isExists =
				taxables.filter((tax) => tax.walletAddress === walletAddress).length >
				0;

			if (isExists) {
				setTaxables([
					...taxables.filter((tax) => tax.walletAddress !== walletAddress),
				]);
				setSelectAll(false);
			} else {
				const result = [...taxables, { ...allTax }];
				setTaxables([...result]);
				setSelectAll(true);
			}

			return;
		}

		let isNewWallet =
			taxables.filter((tax) => tax.walletAddress === walletAddress).length ===
			0;

		if (isNewWallet)
			taxables.push({
				walletAddress: walletAddress,
				hashes: [hash],
			});
		else {
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

	useEffect(() => {
		checkAllIsSelected();
	}, [walletAddress, data, taxables]);

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
			{[...Array(7)].map((x, index) => (
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
					rel="noopener noreferrer"
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
					rel="noreferrer"
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
					rel="noreferrer"
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
