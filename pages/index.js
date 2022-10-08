import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaxViewer from "../components/TaxViewer";
import styles from "../styles/Home.module.css";

export default function Home() {

	const test = () => {
		fetch("/api/getTaxReports", {
			method: "POST",
			body: JSON.stringify({
				walletAddress: "0xf396b0385faC34992E96263256B1ffC02d21b5fc"
			})
		})
	}

	return (
		<div className="flex flex-col p-2 h-screen w-screen">
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />

			<main className="flex flex-row h-full">
				<Sidebar />
				<TaxViewer />
			</main>
		</div>
	);
}
