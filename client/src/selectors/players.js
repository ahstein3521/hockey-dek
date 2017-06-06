import { createSelector } from 'reselect';
import { partition } from 'lodash';

const getPlayerList = state => state.player.list;

const getTeamSettings = state => state.teams.selected.settings;

export const populateTeam = createSelector(
	[getPlayerList, getTeamSettings],
	(playerList, team) => {
		if(!team.players) return;
		
		const list = partition(playerList, ({_id}) => team.players.includes(_id));
		
		const players = list[0].sort(sortCallback);
		
		return { ...team, players, availablePlayers: list[1] };
	}
)

function sortCallback(a,b){
	if(a.lastName > b.lastName){
		return 1;
	}else if(a.lastName < b.lastName){
		return -1;
	}else{
		return 0;
	}
}