import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
	const [walletAddress, setWalletAddress] = useState("");

	return (
		<GlobalContext.Provider value={{ walletAddress, setWalletAddress }}>
			{children}
		</GlobalContext.Provider>
	);
}
