export default function(action, dispatch, getState) {
	let teams = getState().teams.list.slice();
	let index = teams.findIndex(v => v._id === action.team);
	// let payload = teams.filter(v => v._id !== action.team);
	const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];

	action.newSeason.formatted = seasons[action.newSeason.quarter] + ' ' + action.newSeason.year;

	let updatedTeam =	{...teams[index], currentSeason: action.newSeason};

	teams.splice(index, 1, updatedTeam);

		dispatch({
			type: action.nextType,
			payload: teams
		})
}

