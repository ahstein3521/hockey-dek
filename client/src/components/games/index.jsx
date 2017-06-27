import React from 'react';
import { Route } from 'react-router-dom';

import Paper from 'material-ui/Paper'
import ToolBar from '../common/toolbar.jsx';
import NewGameForm from './new-game-form/stepper.jsx';
import CheckInList from './checkin-list/index.jsx';	

const GamePage = () => (
		<div>
			<Paper zDepth={3}>
				<Route path='/games' component= {ToolBar}/>
				<Route exact path='/games' component= {NewGameForm} /> 
				<Route path='/games/check-in' component={CheckInList}/>  
			</Paper>
		</div>
	)


export default GamePage;