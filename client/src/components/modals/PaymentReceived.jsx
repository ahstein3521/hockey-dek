import React from 'react';


const Modal = props => {
	return (
		<div>
		<a href={`/player/receipt/${props.paymentId}`}>
			<h3>
				Click here to download a receipt pdf.
			</h3>
		</a>
		</div>
	)
}

export default Modal;