import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import formatDate from '../components/utils/formatDate';

const formSelector = formValueSelector('CreateGame');


const getFormVals = state => formSelector(state, 'hockeyType', 'date', 'team1');

const getTeams = state => state.teams.list;



export const getAvailableTeams = () => 
	createSelector(
		[getTeams, getFormVals],
		(teams, formVals) => {
			const { hockeyType, date, team1 } = formVals;
			const prettyDate = formatDate(date);
			const availableTeams = teams.filter( team => team.hockeyType === hockeyType);
			const teamTwoInputDisabled = team1? false : true;
			
			return {
				teamTwoInputDisabled,
				teams: availableTeams,
				hockeyType: hockeyType.toLowerCase(),
				date: prettyDate,
			}
		}
	)

