import Indivbox from "../Indivbox/Indivbox"

const Sidebar = () => {
    return (
        //I haven't add the media query
        <div className="w-1/6 h-full border border-slate-200">
            <Indivbox walletAdd="1"/>
        </div>
    )
}

export default Sidebar;