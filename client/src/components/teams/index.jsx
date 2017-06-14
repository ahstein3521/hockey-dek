import React from 'react';
import { Route } from 'react-router-dom';

import Paper from 'material-ui/Paper'
import TeamTable from './roster/index.jsx';
import TeamMenu from './search/main.jsx';
import TeamList from './list/index.jsx';
import TeamSettings from './settings/main.jsx';
import ToolBar from './toolbar/main.jsx';
	

const TeamPage = () => (
		<div>
			<Paper zDepth={3}>
				<Route path='/teams' component= {ToolBar}/>
				<Route exact path='/teams' component= {TeamMenu} />
				<Route path='/teams/list' component={TeamList} />
	    	<Route path='/teams/roster' component={TeamTable} />  
	    	<Route path='/teams/settings' component={TeamSettings} />    
			</Paper>
		</div>
	)


export default TeamPage;