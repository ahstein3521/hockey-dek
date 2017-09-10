import React from 'react';
import { Route } from 'react-router-dom';

import Paper from 'material-ui/Paper'
import ToolBar from '../common/toolbar.jsx';
import NewGameForm1 from './new-game-form/page1.jsx';
import NewGameForm2 from './new-game-form/page2.jsx';
import CheckInList from './checkin-list/index.jsx';	
import AddTeams from './new-season/teamsList.jsx';
import TeamDropdown from './new-season/teamDropdown.jsx';
import AddPlayers from './new-season/playerList.jsx'
import { ListOne } from './checkin-list/teamTable.jsx';

const GamePage = (props) => {

	return(

		<div>
			<Paper zDepth={3}>
				<Route path='/games' component= {ToolBar}/>				
				<Route exact path='/games' component={CheckInList} /> 
				<Route exact path='/games/add-season' component={AddTeams}/>
				<Route exact path='/games/add-season/1' component={TeamDropdown}/>
				<Route exact path='/games/add-season/2' component={AddPlayers}/>
				<Route exact path='/games/new/2' component={NewGameForm2} />
				<Route path='/games/check-in' component={CheckInList} />  
			</Paper>
		</div>
	)
}

export default GamePage;