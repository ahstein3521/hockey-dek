import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add-box';

import {Link} from 'react-router-dom';

import { teamSearch as styles} from '../../../styles/index';

const linkProps = {
	pathname:'/teams/list',
	state: {title: 'All teams'}
};

const Banner = ({ openModal }) => (
	<div>			
		<IconButton
			tooltip="Add A Team"
			onTouchTap={()=> openModal()}
		>
		<AddIcon/>
	</IconButton>
	</div>		
)

function mapDispatch(dispatch){
	return {
		openModal: () => dispatch({ type:'OPEN_MODAL', payload:{view:'createTeam'}})
	}
}


export default connect(null, mapDispatch)(Banner);
