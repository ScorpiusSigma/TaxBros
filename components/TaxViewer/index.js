import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import View from "./View";

export default function TaxViewer() {
	const [optionVal, setOptionVal] = useState(0);
	const { targetWalletAddress } = useContext(GlobalContext);
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
			<div className="flex flex-row w-full justify-between items-center">
				<div className="text-base w-full flex gap-5">
					{options.map((option, index) => (
						<button
							key={index}
							className={`hover:text-[#2E38BF] ${
								optionVal === index ? "text-[#2E38BF] font-bold" : ""
							}`}
							onClick={() => handleOptionSelect(index)}
						>
							{option.title}
						</button>
					))}
				</div>
				<div>
					<button className="px-4 py-2 text-white font-bold w-max rounded-lg active:bg-blue-600 bg-[#2E38BF]">
						Generate Report
					</button>
				</div>
			</div>
			<View walletAddress={targetWalletAddress} type={optionVal} />
		</div>
	);
}
