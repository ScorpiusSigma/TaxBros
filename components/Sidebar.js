import Indivbox from "./Indivbox"
import { useContext, useState } from "react"
import { GlobalContext } from "./context/GlobalContext";

const Sidebar = () => {

    const {setWalletAddress} = useContext(GlobalContext)
    const [data, setdata] = useState({
        address: "",
    });

    const accountChangeHandler = (account) => {
        // Setting an address data
        var newAddress = account.slice(0,5) + '...' + account.substring(37, account.length);
        setWalletAddress(newAddress);
        setdata({
            address: newAddress
        });
    };

    const metamaskConnect = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => accountChangeHandler(res[0]));
        } else {
            alert("install Metamask extension!")
        }
    }

    return (
        //I haven't add the media query
        <div className="w-1/6 h-full border border-slate-200 flex flex-col align-center justify-between">
            <div>
                <Indivbox walletAdd={`${data.address}`}/>
                <Indivbox walletAdd="2"/>
            </div>
           <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" onClick={metamaskConnect}>Connect</button>
        </div>
    )
}

export default Sidebar;