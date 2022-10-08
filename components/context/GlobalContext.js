import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
	const [walletAddresses, setWalletAddresses] = useState([]);
	const [targetWalletAddress, setTargetWalletAddress] = useState("");
	const [taxables, setTaxables] = useState([]);

	return (
		<GlobalContext.Provider
			value={{
				targetWalletAddress,
				setTargetWalletAddress,
				walletAddresses,
				setWalletAddresses,
				taxables,
				setTaxables,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
