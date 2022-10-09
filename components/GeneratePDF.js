import jsPDF from"jspdf"
import { GlobalContext } from "./context/GlobalContext";
import {useContext} from "react"

export default function GeneratePDF() {
    
    const {taxables, targetWalletAddress, walletAddresses} = useContext(GlobalContext)

    const generate = async () => {
        await fetch("/api/getTaxables", {
            method:"POST",
            body: JSON.stringify({
                taxables: taxables
            })
        }).then(res => res.json()).then(data => console.log(data))
    }

    return <button onClick={generate} className="px-4 py-2 text-white font-bold w-max rounded-lg active:bg-blue-300 bg-blue-600">
        Generate Report
    </button>
    
}