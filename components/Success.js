const Success = (props) => {
    if (!props.su) {
        return null;
    } else {
        return (
            <div className = "border border-transparent mt-2 rounded w-max px-2 bg-green-400">
                <span className="text-white font-bold">Wallet Address Added</span>
            </div>
        )
    }
}

export default Success;