const Indivbox = (props) => {
    return (
        <div className="border border-gray-200 p-4">
            <img className="rounded-full w-10 inline mr-5" src="./Ethereum.png"></img>
            <span className="text-base font-bold">{`${props.walletAdd}`}</span>
        </div>
    )
}

export default Indivbox;