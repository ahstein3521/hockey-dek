import React from 'react';

import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';


const TeamNav = props => {
	
	return(
		<div id="nav-arrows">
			<IconButton
				onTouchTap={()=> props.history.goBack()}
			>
				<BackIcon/>
			</IconButton>
			<IconButton
				onTouchTap={()=> props.history.goForward()}
			>
				<ForwardIcon/>
			</IconButton>			
		</div>
	)
}

export default TeamNav;