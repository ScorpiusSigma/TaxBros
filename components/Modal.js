const Modal = ({ isVisible, onClose, children }) => {
	const handleClose = (e) => {
		if (e.target.id === "wrapper") onClose();
	};

	if (!isVisible) {
		return null;
	} else {
		return (
			<div
				className="fixed z-10 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
				id="wrapper"
				onClick={handleClose}
			>
				<div className="w-[600px] flex flex-col">
					<button
						className="text-white text-xl place-self-end"
						onClick={() => onClose()}
					>
						X
					</button>
					<div className="bg-white p-2 rounded">{children}</div>
				</div>
			</div>
		);
	}
};

export default Modal;
