import React from 'react';
import { Route } from 'react-router-dom';

import Paper from 'material-ui/Paper'
import PlayerSearch from './search/index.jsx';
import Profile from './profile/index.jsx';
import AddPlayer from './add-players/main.jsx';
import ToolBar from '../common/toolbar.jsx';
	

const TeamPage = () => (
		<div>
			<Paper zDepth={3}>
				<Route path='/players' component= {ToolBar}/>
				<Route exact path='/players' component= {PlayerSearch} />
				<Route path='/players/profile' component= {Profile} />
				<Route path= '/players/add' component={AddPlayer}/>
			</Paper>
		</div>
	)


export default TeamPage;