import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth';
import menuReducer from './menu';
import teamReducer from './team/index';
import playerReducer from './player/index';
import snackbarReducer from './snackbar';
import loadingReducer from './loading';

const rootReducer = combineReducers({
	auth: authReducer,
	form:formReducer,
	menu: menuReducer,
	loading: loadingReducer,
	snackbar:snackbarReducer,
	teams: teamReducer,
	player: playerReducer
});

export default rootReducer;
