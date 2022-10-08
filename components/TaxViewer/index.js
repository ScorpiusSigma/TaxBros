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
