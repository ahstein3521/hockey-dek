
export const ROOT_URL = window.location.origin;
// export const ROOT_URL = 'https://hockey-dek.herokuapp.com/';

//Type Variables passed down to the reducers

	//Authentication
export const VERIFY_AUTH_STATUS = 'InitAuthState';
export const LOG_OUT_USER = 'log out';


	//Teams
export const FETCH_TEAM_LIST = 'fetch teams list';
export const FETCH_TEAM_ROSTER = 'fetch team roster';
export const ADD_TEAM = 'ADD_TEAM';
export const DELETE_TEAM = 'DELETE_TEAM';
export const UPDATE_ROSTER = 'UPDATE_ROSTER';

	//Players
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const UPDATE_PLAYER_IN_ROSTER = 'UPDATE_PLAYER_ROSTER';	
export const FETCH_PLAYER_LIST = 'FETCH_PLAYER_LIST';
export const UPDATE_PLAYER_LIST = 'UPDATE_NAME_LIST';
export const UPDATE_PLAYER_INFO = 'UPDATE_PLAYER_INFO';
export const UPDATE_PLAYER_GAMES = 'UPDATE_PLAYER_GAMES';
export const ADD_PLAYER = 'ADD_PLAYER';

 	//UI
export const TOGGLE_MENU = 'TOGGLE_MENU'; 
export const SET_LOAD_STATE = 'SET_LOAD_STATE';	
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';