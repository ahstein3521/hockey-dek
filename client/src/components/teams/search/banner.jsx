import React from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ReturnIcon from 'material-ui/svg-icons/action/list';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/content/add-box';

import {Link} from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { teamSearch as styles} from '../../../styles/index';

const Banner = ({ showRosterIcon, openModal }) => (
	<Toolbar style={styles.toolbar}>
		<ToolbarGroup>
			<ToolbarTitle text=""/>
		</ToolbarGroup>
		<ToolbarGroup>
			<Link to="/teams/list">
				<FlatButton label="Show All"/>
			</Link>				
			<IconButton
				tooltip="Add A Team"
				onTouchTap={()=> openModal("createTeam")}
			>
				<AddIcon/>
			</IconButton>
		</ToolbarGroup>	
	</Toolbar>		
)

export default Banner;

