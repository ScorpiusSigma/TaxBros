import Head from "next/head";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaxViewer from "../components/TaxViewer/index";

export default function Home() {
	return (
		<div className="flex flex-col p-2 h-screen w-full">
			<Head>
				<title>TaxBros</title>
				<meta name="description" content="The #1 Crypto taxing service" />
				<link rel="icon" href="/TaxBros' Logo.png" />
			</Head>
			<Navbar />

			<main className="flex flex-row h-full">
				<Sidebar />
				<TaxViewer />
			</main>
		</div>
	);
}
