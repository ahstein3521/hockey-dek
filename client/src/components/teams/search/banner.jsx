import React from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ReturnIcon from 'material-ui/svg-icons/action/list';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import {Link} from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';



const Banner = ({selected}) => (
	<Toolbar style={{background:'#3f51b5'}}>
		<ToolbarGroup>
			<ToolbarTitle text=""/>
		</ToolbarGroup>
		<ToolbarGroup>
		<IconButton
			iconStyle={{color:"white"}}
			tooltip="Add A Team"
		>
			<AddIcon/>
		</IconButton>
		<IconButton
			iconStyle={{color:"white"}}
			tooltip="Delete A Team"
		>
			<DeleteIcon/>
		</IconButton>		
		</ToolbarGroup>	
	</Toolbar>		
)

export default Banner;

