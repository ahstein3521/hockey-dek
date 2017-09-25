import fetchBasicInfo from './fetchPlayerInfo';
import getPlayerDetails from './getPlayerDetail';
import updateBasicInfo from './updatePlayerInfo';
import { addPayment, editPayment } from './payments';
import { editSuspension, addSuspension } from './suspensions';

export default function({ dispatch, getState }) {
	return next => action => {

		switch (action.type) {

		case 'SELECT_PLAYER_TAB':
			return getPlayerDetails(action.tab, dispatch, getState);
		case 'INIT_SELECT_PLAYER':
			return fetchBasicInfo(action.playerId, dispatch, getState);
		case 'INIT_UPDATE_PLAYER_INFO':
			return updateBasicInfo(action.player, dispatch, getState);	
		case 'ADD_PAYMENT':
			return addPayment(action, dispatch, getState);	
		case 'EDIT_PAYMENT':
			return editPayment(action, dispatch, getState);	
		case 'ADD_SUSPENSION':
			return addSuspension(action, dispatch, getState);
		case 'EDIT_SUSPENSION':
			return editSuspension(action, dispatch, getState);		
		default:
			return next(action);	
		}
	}
}

