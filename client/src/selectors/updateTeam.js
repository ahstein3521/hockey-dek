import { createSelector } from 'reselect';
import { kebabCase } from 'lodash';

const getPlayerList = state => state.player.list;

const getTeamSelected = state => state.teams.selected;

const getTeamList = state => state.teams.list;

export const getAllTeamIds = createSelector(
	[getTeamSelected, getTeamList],
	(selected, teamList) => {
		
		if (!selected.team) return;

		return teamList.reduce((list, team) => {
			if (team._id !== selected.team._id) { 
				team.slug = kebabCase(`${team.name} ${team.hockeyType}`);
				list.push(team);
			}
			return list;
		}, []);
	}
)

export const getInitialFormVals = createSelector(
	[getPlayerList, getTeamSelected],
	(playerList, selected) => {
		if (!selected.team) return;

		if (!selected.team.players) {
			return { 
				seasons: selected.seasons, 
				players: [], 
				teamInfo: selected.team , 
				availablePlayers: playerList 
			};
		}
		
		const { seasons, team: { players, ...teamInfo }} = selected;

		const playerIds = players.map(({_id}) => _id);

		const availablePlayers = playerList.filter(({_id}) => !playerIds.includes(_id));

		return { seasons, players, teamInfo, availablePlayers };
	}
)
