import fetchBasicInfo from './fetchPlayerInfo';
import getPlayerDetails from './getPlayerDetail';
import updateBasicInfo from './updatePlayerInfo';

export default function({ dispatch, getState }) {
	return next => action => {

		switch (action.type) {

		case 'SELECT_PLAYER_TAB':
			return getPlayerDetails(action.tab, dispatch, getState);
		case 'INIT_SELECT_PLAYER':
			return fetchBasicInfo(action.playerId, dispatch, getState);
		case 'INIT_UPDATE_PLAYER_INFO':
			return updateBasicInfo(action.player, dispatch, getState);	
		default:
			return next(action);	
		}
		return next(action);
	}
}

