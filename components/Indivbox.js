import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";

const Indivbox = ({ walletAdd }) => {
	const {
		targetWalletAddress,
		setTargetWalletAddress,
		walletAddresses,
		setWalletAddresses,
	} = useContext(GlobalContext);

	const handleClick = () => {
		setTargetWalletAddress(targetWalletAddress !== walletAdd ? walletAdd : "");
	};

	const handleDelete = () => {
		const result = walletAddresses.filter((wallet) => wallet !== walletAdd);
		setWalletAddresses([...result]);
		if (targetWalletAddress === walletAdd) setTargetWalletAddress("");
	};

	var truncAdd =
		walletAdd.slice(0, 5) + "..." + walletAdd.substring(37, walletAdd.length);

	return (
		<div
			className={`flex flex-row px-4 py-3 border-b w-full border-gray-200 cursor-pointer ${
				targetWalletAddress === walletAdd && "bg-blue-600 text-white"
			}`}
		>
			<div className="w-full" onClick={handleClick}>
				<img
					className="rounded-full w-10 inline mr-5"
					src="./Ethereum.png"
				></img>
				<span className="text-sm font-bold ">{`${truncAdd}`}</span>
			</div>
			<button
				className="text-red-500 font-bold text-lg text-center"
				onClick={handleDelete}
			>
				-
			</button>
		</div>
	);
};

export default Indivbox;
