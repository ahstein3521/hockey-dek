import React from 'react';
import { Route } from 'react-router-dom';

import Paper from 'material-ui/Paper'
import Profile from './profile/index.jsx';
import AddPlayer from './add-players/main.jsx';
import ToolBar from '../common/toolbar.jsx';
import PlayerList from './menu/index.jsx';
import NewSuspensionForm from './suspend-player/newSuspension.jsx';
import EditSuspensionForm from './suspend-player/editSuspension.jsx';

const TeamPage = () => (
		<div>
			<Paper zDepth={3}>
				<Route path='/players' component= {ToolBar}/>
				<Route exact path='/players' component= {PlayerList} />
				<Route path='/players/profile' component= {Profile} />
				<Route path= '/players/add' component={AddPlayer}/>
				<Route path='/players/suspension/new' component={NewSuspensionForm} />
				<Route path='/players/suspension/edit/:suspensionId' component={EditSuspensionForm} />
			</Paper>
		</div>
	)


export default TeamPage;