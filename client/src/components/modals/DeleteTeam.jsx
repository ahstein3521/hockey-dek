import React from 'react';

const DeleteTeamMessage = props => (
	<h4>
		{`Are you sure you want to delete ${props.name} (${props.hockeyType})`}
	</h4>
);

export default DeleteTeamMessage;