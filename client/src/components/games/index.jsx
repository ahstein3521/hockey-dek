import React from 'react';
import { Route } from 'react-router-dom';

import Paper from 'material-ui/Paper'
import ToolBar from '../common/toolbar.jsx';
import NewGameForm1 from './new-game-form/page1.jsx';
import NewGameForm2 from './new-game-form/page2.jsx';
import CheckInList from './checkin-list/index.jsx';	

const GamePage = () => (
		<div>
			<Paper zDepth={3}>
				<Route path='/games' component= {ToolBar}/>
				<Route exact path='/games' component={NewGameForm1} /> 
				<Route exact path='/games/new/2' component={NewGameForm2} />
				<Route path='/games/check-in' component={CheckInList} />  
			</Paper>
		</div>
	)


export default GamePage;