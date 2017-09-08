import { createSelector } from 'reselect';

const getFormVals = (state, props) => props.location.state.formValues;
const getTeams = state => state.teams.list;
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

export const getPlayerList = () => 
	createSelector(
		[getFormVals, getPlayers],
		(formVals, players) => {
			const { team1, team2, seasonName } = formVals;

			let availablePlayers = [];
			let roster1 = [];
			let roster2 = [];

			const format = ({firstName, lastName, _id}) =>
				({
					lastName,
					firstName,
					fullName: lastName+', '+firstName, 
					_id, 
				})

			for (let i = 0; i < players.length; i++) {
				let player = format(players[i]);

				if (team1.players.includes(player._id)) {
					roster1.push(player);
				} else if (team2.players.includes(player._id)) {
					roster2.push(player);					
				} else {
					availablePlayers.push(player);
				}
			}

			team1.players = roster1.sort(orderByLastname);
			team2.players = roster2.sort(orderByLastname);

			return {
				initialValues: formVals,
				availablePlayers,
				seasonName
			}

		}
	)	