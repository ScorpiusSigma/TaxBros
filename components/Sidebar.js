import Indivbox from "./Indivbox"
import { useContext, useState } from "react"
import { GlobalContext } from "./context/GlobalContext";
import Modal from "./Modal";
import Success from "./Success";

const Sidebar = () => {

	var [combinedWalletAdd, setCombinedWalletAdd] = useState([])
    const {setWalletAddress} = useContext(GlobalContext)
    const [data, setdata] = useState({
        address: "",
    });

    const accountChangeHandler = (account) => {
        // Setting an address data
        setWalletAddress(account);
        setdata({
            address: account
        });
		combinedWalletAdd.push(account)
		setCombinedWalletAdd([...combinedWalletAdd])
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
	const [showModal, setshowModal] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		var newEditedAddress = event.target.walletAdd.value
		let resp = newEditedAddress.match(/0x[A-f0-9]{40}/g);
		console.log(resp)
		if (newEditedAddress.match(resp) === null || newEditedAddress.length !== 42) {
			alert('Please input the correct Ethereum Address!');
		} else {
			combinedWalletAdd.push(newEditedAddress)
			setCombinedWalletAdd([...combinedWalletAdd])
			setSuccess(!success);
			setTimeout(() => {
				setSuccess(false);
			}, 3000);
		}
	}

    return (
        //I haven't add the media query
		//This one need to implement for loop
        <div className="w-1/6 h-full border border-slate-200 flex flex-col align-center justify-between">
            <div>

				{console.log(combinedWalletAdd)}
				{combinedWalletAdd.map(address=> <Indivbox walletAdd={`${address}`}/>)}
            </div>
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" onClick={() => setshowModal(true)}>Connect</button>
		   <Modal isVisible={showModal} onClose={() => setshowModal(false)}>
			   <div className="p-6">
				   <h3 className="text-xl font-semibold text-gray-900 mb-5">
					   Select Your Addressing Method
				   </h3>
				   <form className="space-y-6" onSubmit={handleSubmit}>
						   <label for="email" className="block text-sm font-medium text-gray-900">Wallet Address</label>
						   <input id="walletAdd" name="walletAdd" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5 mr-2.5 inline" required/>
						   <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">Add</button>
				   </form>
				   <Success su={success}/>
				   <div class="relative flex py-5 items-center">
						<div class="flex-grow border-t"></div>
						<span class="flex-shrink mx-4 text-black font-bold">OR</span>
						<div class="flex-grow border-t"></div>
					</div>
					<div class="flex items-center">
						<button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex-auto" onClick={metamaskConnect}>MetaMask</button>
					</div>
			   </div>
		   </Modal>
        </div>
    )
}

export default Sidebar;