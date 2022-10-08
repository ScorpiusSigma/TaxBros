const Indivbox = (props) => {
    var truncAdd = props.walletAdd.slice(0,5) + '...' + props.walletAdd.substring(37, props.walletAdd.length);
    return (
        <div className="border border-gray-200 p-4">
            <img className="rounded-full w-10 inline mr-5" src="./Ethereum.png"></img>
            <span className="text-sm font-bold ">{`${truncAdd}`}</span>
        </div>
    )
}

export default Indivbox;