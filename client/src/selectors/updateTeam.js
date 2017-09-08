import { createSelector } from 'reselect';


const getPlayerList = state => state.player.list;

const getTeamSelected = state => state.teams.selected;

const getOwnProps = (x, { tabValue, searchText, ...ownProps}) => ownProps;




export const getPlayerConfig = () => 
	createSelector(
		[getPlayerList, getTeamSelected, getOwnProps],
		( players, selected, ownProps ) => {
			const team = selected.team;

			const availablePlayers = [];
			const currentPlayers = []; 
			const addedPlayers = [];
			const removedPlayers = [];

			console.log(players, selected, ownProps);

			players.forEach(player => {
				
				if (team.players && 
					team.players.some(p => p._id === player._id)) {
					if (!ownProps.removed.includes(player._id)) {
						currentPlayers.push(player)
					}
					else removedPlayers.push(player)
				}
				else {
					//Player is available
					if (ownProps.added.includes(player._id)) {
						addedPlayers.push(player);
					}
					else {
						availablePlayers.push(player)
					} 
				}
			})

			return { 
				available:availablePlayers,
				current:currentPlayers,
				added:addedPlayers,
				removed:removedPlayers
			}
		}
	)

