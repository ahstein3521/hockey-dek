import {map, orderBy} from 'lodash';

   

export function replaceIndex(array, payload){
	
	return map(array, item => {
		if(item._id == payload._id){
			return payload;
		}else{
			return item;
		}
	})
};
//return new array with updated list item; 

export function sortList(currState, category, direction){
	const {players, sortBy, sortOrder} = currState;

	if(category == sortBy) return players.reverse();
	else return orderBy(players, category, direction);
}