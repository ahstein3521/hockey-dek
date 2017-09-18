import axios from 'axios';
import { reset } from 'redux-form';
import { 
	SELECT_PLAYER, 
	UPDATE_PLAYER_IN_ROSTER,
	ADD_PLAYER, 
	UPDATE_PLAYER_INFO,
	UPDATE_PLAYER_LIST_INDEX,
	ROOT_URL,
	SELECT_PLAYER_TAB,
	SET_LOAD_STATE,  
} from './constants';



export function selectPlayer({_id}){	
	
	return { 
		type: 'INIT_SELECT_PLAYER',
		playerId: _id 
	};
}

export function selectPlayerTab(tabNumber) {

	return {
		type: SELECT_PLAYER_TAB,
		tab: tabNumber
	}
}

export function createPlayer(form, dispatch, {teamList}) {
	let { team, ...newPlayer } = form;
	const resetForm = reset('CreatePlayerForm');

	console.log(form, teamList)
	if (team) {
		const teamMatch = teamList.find(t => t.currentSeason._id === team);
		const { currentSeason: { quarter, year }} = teamMatch;
		newPlayer.payments = [
			{	
				season: team, 
				quarter,
				year
			}
		]
	}

	const body = { seasonId: team, newPlayer };

	axios.post(`${ROOT_URL}/player/create`, body)
		.then(({data}) => 
			dispatch({ type: ADD_PLAYER, payload: data })
		)
		.then(() => dispatch(resetForm))
		.catch(err => console.error(err, 'ERROR '))
 }


export function updatePlayer( body, dispatch ) {
	//const url = `${ROOT_URL}/player/update`;
	console.log(body);
	dispatch({
		type: 'INIT_UPDATE_PLAYER_INFO',
		player: body
	});
	// const query = { _id: body._id };
	
	// if (body.currTeamId !== body.season._id) {
	// 	axios.put(`${ROOT_URL}/season/`)
	// }

	// axios.put(url, { query, update: body })
	// 	.then(()=> {
	// 		dispatch({ 
	// 			type: UPDATE_PLAYER_INFO, 
	// 			payload: body, 
	// 			category: 'basicInfo' 
	// 		})
	// 		return body;
	// 	})
	// 	.then(data => 
	// 		dispatch({ type: UPDATE_PLAYER_LIST_INDEX, payload:data})
	// 	)		
	// 	.then(() => {
	// 		dispatch({type:'OPEN_SNACKBAR',payload:'Player Updated'})
	// 	})
	// 	.catch(err => console.error("Something went wrong", err))
}



