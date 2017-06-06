import React from 'react';
import { Route } from 'react-router-dom';

import TeamTable from './roster/index.jsx';
import TeamMenu from './search/main.jsx';
import TeamList from './list/index.jsx';
import TeamSettings from './settings/main.jsx';

	

const TeamPage = () => (
		<div>
			<Route exact path='/teams' component= {TeamMenu} />
			<Route path='/teams/list' component={TeamList} />
	    <Route path='/teams/roster' component={TeamTable} />  
	    <Route path='/teams/settings' component={TeamSettings} />    
		</div>
	)


export default TeamPage;