import React from 'react';

const Modal = props => {
	return (
		<h3>{
			`Are you sure you want to remove ${props.player.fullName} from this team?`}</h3>

	)
}

export default Modal;