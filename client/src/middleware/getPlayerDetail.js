import axios from 'axios';


export default function(tab, dispatch, getState) {
	const sections = { 2:'games', 3:'payments', 4:'suspensions'};
	const category = sections[tab]
	const player = getState().player.selected;
	const currState = player[category];
	const route = `/player/fetch/${player.basicInfo._id}/${category}`;
	
	if (!currState && tab !== 1) {
		axios.get(route)
			.then(res => {
				
				dispatch({
					type: 'FETCH_PLAYER_CATEGORY',
					tab,
					category,
					newData: res.data
				})
			}).catch(e => console.log(e))
	}
	else {
		dispatch({ type: 'SELECT_PLAYER_CATEGORY', tab })
	}
}
