import axios from 'axios';
import { VERIFY_AUTH_STATUS, LOG_OUT_USER, ROOT_URL } from './constants';


export function initAuthState(){

	return function(dispatch){
		axios.post(`${ROOT_URL}/auth/authenticate`)
		  .then(({data}) => {
				dispatch({
					type:VERIFY_AUTH_STATUS, 
					payload: {...data, loading:false} 
				});
			})
			.catch(err => console.log(err));
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