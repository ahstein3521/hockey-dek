export default function(action, dispatch, getState) {

	let payload = getState().teams.list.filter(v => v._id !== action.update._id);
		
	payload.push(action.update);

		dispatch({
			type: action.nextType,
			payload
		})
}