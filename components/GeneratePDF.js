import jsPDF from"jspdf"
import { GlobalContext } from "./context/GlobalContext";
import {useContext} from "react"

export default function GeneratePDF() {
    
    const {taxables, targetWalletAddress, walletAddresses} = useContext(GlobalContext)
    console.log(walletAddresses)
    const generate = ()=>{
        const doc = new jsPDF();
        
        const test = doc.loadImageFile("irsStatement.jpg", true)
        console.log(test)
        doc.text(20,20, 'taxBros')
        doc.save("tax.pdf")
    }

    return <button onClick={generate} className="px-4 py-2 text-white font-bold w-max rounded-lg active:bg-blue-300 bg-blue-600">
        Generate Report
    </button>
    
}