import axios from 'axios';
import { 
	VERIFY_AUTH_STATUS,
	FETCH_PLAYER_LIST,
	FETCH_TEAM_LIST, 
	LOG_OUT_USER, 
	ROOT_URL 
} from './constants';


export function initializeApp(){

	return function(dispatch){
		axios.post(`${ROOT_URL}/auth/authenticate`)
		  .then(({data}) => {
		  	const { auth, players, teams } = data;
		  	
				dispatch({ type:VERIFY_AUTH_STATUS, payload: auth });

				if(auth.loggedIn){
					dispatch({ type: FETCH_PLAYER_LIST, payload: players });
					dispatch({ type: FETCH_TEAM_LIST, payload: teams })
				}
			})
			.catch(err => dispatch({type:'ERROR', payload: err}));
	}
}

export function logOut(){
	return dispatch => {
		axios.post(`${ROOT_URL}/auth/logout`)
			.then((data) => {
				dispatch({type:LOG_OUT_USER});
			})	
	}
}