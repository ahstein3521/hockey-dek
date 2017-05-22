import axios from 'axios';
import { 
	FETCH_PLAYER_LIST,
	SELECT_PLAYER, 
	UPDATE_PLAYER_IN_ROSTER, 
	UPDATE_PLAYER_INFO,
	UPDATE_NAME_LIST,
	ROOT_URL 
} from './constants';


export function fetchPlayerNames(){
	const url = `${ROOT_URL}/player/names`;
	return dispatch => {
		axios.get(url)
			.then(({data}) => dispatch({type: FETCH_PLAYER_LIST, payload: data}) )
			.catch(err => console.log(err))
	}
}

export function selectPlayer(player){
	return { type:SELECT_PLAYER, payload:player };
}

export function submitPlayerSearch(player){

	const {_id} = player;
	return dispatch => {
		axios.get(`${ROOT_URL}/player/fetch/${_id}`)
			.then(({data}) => {
				dispatch({type: SELECT_PLAYER, payload: data})
			})
	}
}

export function updatePlayer(body){
	const url = `${ROOT_URL}/player/update/${body._id}`;
	
	return dispatch => {
		axios.put(url, body)
			.then(({data})=> {
				dispatch({ type: UPDATE_PLAYER_INFO, payload:data })
				return data
			})
			.then(data => {
				dispatch({ type: UPDATE_NAME_LIST, payload:data})
				return data;
			})
			.then(data => {
				if(data.checkIns){
					return dispatch({type: UPDATE_PLAYER_IN_ROSTER, payload:data})
				}
				return data;
			})			
			.then(() => {
				dispatch({type:'OPEN_SNACKBAR',payload:'Player Updated'})
			})
			.catch(err => console.error("Something went wrong", err))
	}
}

export function fetchPlayerDetails(player, done){
	const {_id, checkIns} = player;
	return dispatch => {
		axios.get(`${ROOT_URL}/player/fetch/${_id}`)
			.then(({data}) => {
				data.basicInfo.checkIns = checkIns;

				dispatch({type: SELECT_PLAYER, payload:data})
			})
			.then(() => done())
	}
}