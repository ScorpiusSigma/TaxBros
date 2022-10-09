import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { GlobalContext } from "./context/GlobalContext";
import { useContext } from "react";

export default function GeneratePDF() {
	const { taxables, targetWalletAddress, walletAddresses } =
		useContext(GlobalContext);

	const generate = async () => {
		if (taxables.filter((tax) => tax.hashes.length > 0).length === 0) {
			alert("No selections were made");
			return;
		}
		const taxable = await fetch("/api/getTaxables", {
			method: "POST",
			body: JSON.stringify({
				taxables: taxables,
			}),
		}).then((res) => res.json());

		const exp = 0;
		const inc = 0;
		console.log("r:", taxable);
		for (var tx of taxable["image"]) {
			if (tx["type"] === "Expense") {
				exp += parseFloat(tx["usd"]);
			} else {
				inc += parseFloat(tx["usd"]);
			}
		}
		console.log(inc, exp);
		const doc = new jsPDF();

		doc.text("TaxBros", 95, 10);
		doc.setFontSize(10);
		doc.text(
			"Date Range: " +
				taxable["image"][taxable["image"].length - 1]["humantimeStamp"] +
				" - " +
				taxable["image"][0]["humantimeStamp"],
			65,
			20
		);
		autoTable(doc, {
			head: [["Transaction", "Amount"]],
			body: [
				["Income", inc],
				["Expense", exp],
				["Profit", (inc - exp).toFixed(2)],
			],
			margin: 30,
		});
		if (inc - exp <= 0) {
			doc.text(
				"Based on 21% Tax Charges you will be charged $0 in taxes",
				55,
				90
			);
		} else {
			doc.text(
				"Based on 21% Tax Charges you will be charged $" +
					((inc - exp) * 0.21).toFixed(2) +
					" in taxes",
				55,
				90
			);
		}

		doc.save("tax.pdf");
	};

	return (
		<button
			onClick={generate}
			className="px-4 py-2 text-white font-bold w-max rounded-lg active:bg-blue-300 bg-blue-600"
		>
			Generate Report
		</button>
	);
}
