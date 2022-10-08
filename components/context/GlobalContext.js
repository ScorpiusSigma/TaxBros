import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
	const [walletAddress, setWalletAddress] = useState("");
	const [taxables, setTaxables] = useState([]);

	return (
		<GlobalContext.Provider
			value={{ walletAddress, setWalletAddress, taxables, setTaxables }}
		>
			{children}
		</GlobalContext.Provider>
	);
}
