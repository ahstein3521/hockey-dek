import axios from 'axios';

export default function(playerId, dispatch, getState) {

	const route = `/player/fetch/${playerId}`;

	const teams = getState().teams.list.map(team => {
		return {
			displayName: `${team.name} - ${team.hockeyType}`,
			seasonId: team.currentSeason._id
		};
	})
	dispatch({ type: 'SET_LOAD_STATE', payload: true })
	
	axios.get(route)
		.then(({data}) => {
			const [season, player] = data;
			

			player.waiver = player.waivers.find(v => v.year === season.year);
			player.waiverSigned = player.waiver? true : false;
			
			delete player.waivers;

			let payload = {
				teamList: teams,
				basicInfo:{
					...player,
					currTeamId: season? season._id : 'Inactive',
					fullName: `${player.firstName} ${player.lastName}`,
					season: {
						team: season && season.team? season.team.name : '',
						hockeyType: season && season.team? season.team.hockeyType : '',
						displayName: season? season.formatted : '',
						quarter: season? season.quarter : -1,
						year: season? season.year : -1,
						_id: season? season._id : 'Inactive'
					}
				},
				suspensions: null,
				games: null,
				payments: null
			};
			console.log({ payload })
			dispatch({ type: 'SELECT_PLAYER', payload })
			dispatch({ type: 'SET_LOAD_STATE',  payload: false })
		}).catch(err => console.warn(err))
}