import { createSelector } from 'reselect';
import axios from 'axios';

const getCurrentPlayers = state => state.teams.selected.team.players;
const getSeason = state => state.teams.selected.team.currentSeason;


export const getPlayersOnTeam = () => 
	createSelector(
		[getCurrentPlayers, getSeason],
		(current, currentSeason) => {
			return {}
		}
	)