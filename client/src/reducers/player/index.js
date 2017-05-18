import {combineReducers} from 'redux';
import playerReducer from './details';
import playerListReducer from './list';

export default combineReducers({
	selected: playerReducer,
	list: playerListReducer
})
