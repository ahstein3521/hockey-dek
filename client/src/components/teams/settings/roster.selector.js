import { createSelector } from 'reselect';


const getTeam = state => state.teams.selected;
const getPlayers = state => state.player.list;

const orderByLastname = (a, b) => {
	if (a.lastName > b.lastName) {
		return 1
	} else if (a.lastName < b.lastName) {
		return -1
	} else {
		return 0
	}
}

export default () => 
	createSelector(
		[getTeam, getPlayers],
		(team, players) => {
			
			let availablePlayers = [];
			let currSeason = team.seasons.find(v => 
					v._id === team.currentSeason._id
				)
			let roster = [];

			const format = ({firstName, lastName, _id}) =>
				({
					lastName,
					firstName,
					fullName: lastName+', '+firstName, 
					_id, 
				})

			for (let i = 0; i < players.length; i++) {
				let player = format(players[i]);

				if (currSeason.players.includes(player._id)) {
					roster.push(player);				
				} else {
					availablePlayers.push(player);
				}
			}

			team.players = roster.sort(orderByLastname);
			console.log({ team });
			return {
				initialValues: team,
				availablePlayers,
				currSeason,
				team
				
			}

		}
	)	