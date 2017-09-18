import axios from 'axios';

export default function(player, dispatch, getState) {
	

	const { _id, firstName, lastName, fullName, email, phone } = player;

	dispatch({ type: 'UPDATE_PLAYER_LIST_INDEX', payload: {_id, firstName, lastName, email, phone, fullName }});

	if (player.currTeamId !== player.season._id) {
		
		if (player.currTeamId === 'Inactive') {
			return removeFromRoster(player, dispatch, getState);
		} else if (player.season._id === 'Inactive') {
			return addPlayerToRoster(player, dispatch, getState);
		} else {
			return swapTeams(player, dispatch, getState)
		}
	} else {
		axios.put('/player/update', {query: { _id }, update: player })
			.then(() => {
				dispatch({ type: 'UPDATE_PLAYER_INFO', category: 'basicInfo', payload: player });
				dispatch({ type: 'OPEN_SNACKBAR', payload: `${player.firstName +' '+player.lastName}'s info has been updated` });
			})


	}
}


function removeFromRoster(player, dispatch, getState) {
	let body = { seasonId: player.season._id, playerId: player._id };

	const payload = {
		...player,
		season: {
			_id: 'Inactive'
		}
	}
	
	axios.put('/season/roster/remove-player', body)
		.then(() =>{
			dispatch({ type: 'UPDATE_PLAYER_INFO', category: 'basicInfo', payload });
			dispatch({ type: 'OPEN_SNACKBAR', payload: `${player.firstName +' ' +player.lastName}'s info has been updated` })
		})
}

function addPlayerToRoster(player, dispatch, getState) {
	const newTeam = getState().teams.list
		.find(v => v.currentSeason._id === player.currTeamId)
	
	let body = { 
		seasonId: player.currTeamId,
		playerId: player._id 
	};
	
	const payload = {
		...player,
		season: {
			displayName: newTeam.currentSeason.formatted,
			_id: newTeam.currentSeason._id,
			team: newTeam.name,
			hockeyType: newTeam.hockeyType
		}
	}
	axios.put('/season/roster/add-player', body)
		.then(() => {
			dispatch({ type: 'UPDATE_PLAYER_INFO', category: 'basicInfo', payload});
			dispatch({ type: 'OPEN_SNACKBAR', payload: `${player.firstName + ' ' +player.lastName}'s info has been updated` })
		})
}

function swapTeams(player, dispatch, getState) {
	const newTeam = getState().teams.list
		.find(v => v.currentSeason._id === player.currTeamId)
	
	let body = { 
		newSeasonId: player.currTeamId,
		oldSeasonId: player.season._id, 
		playerId: player._id 
	};

	const payload = {
		...player,
		season: {
			displayName: newTeam.currentSeason.formatted,
			_id: newTeam.currentSeason._id,
			team: newTeam.name,
			hockeyType: newTeam.hockeyType
		}
	};

	axios.put('/season/roster/swap', body)
		.then(() => {
			dispatch({ type: 'UPDATE_PLAYER_INFO', category: 'basicInfo', payload});
			dispatch({ type: 'OPEN_SNACKBAR', payload: `${player.firstName + ' ' + player.lastName}'s info has been updated` })
		})
};





