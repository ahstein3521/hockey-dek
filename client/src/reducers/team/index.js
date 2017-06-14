import {combineReducers} from 'redux';
import teamDetailsReducer from './detail';
import teamListReducer from './list';



export default combineReducers({
	selected: teamDetailsReducer,
	list: teamListReducer
})
