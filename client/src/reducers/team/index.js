import {combineReducers} from 'redux';
import teamDetailsReducer from './detail';
import teamListReducer from './list';
import teamSettingsReducer from './settings';

const teamSelected = combineReducers({
	settings: teamSettingsReducer,
	roster: teamDetailsReducer
});

export default combineReducers({
	selected: teamSelected,
	list: teamListReducer
})
