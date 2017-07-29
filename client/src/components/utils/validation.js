import { kebabCase, some } from 'lodash';

export default function( values, { teamsList }) {
	let errors = { team: {}, season: {}};
	let teamId;
	let { name, hockeyType } = values;

	if (values.team) {
	/* 
		The CreateTeamForm and the UpdateTeamForm are formatted 
		slightly different - this conditional makes sure that 
		the correct input values are being read and checked
	*/
		hockeyType = values.team.hockeyType;
		name = values.team.name;		
	}

	if (!name || name.trim().length < 3 ){ 
		errors.name = errors.team.name = 'Please enter a team name of at least 3 characters';
	}
	if (!hockeyType) {
		errors.hockeyType = errors.team.hockeyType ='Please select a hockey type';
	}

	/*
		Each team has a unique id which is a combination of 
		team name and hockey type (ex: boston-bruins-dek).
		To prevent a mongodb error gettign thrown as a result of 
		trying to insert a document with a duplicate id, this 
		check is performed on the team name and hockey type fields.
	*/	
	if (hockeyType && name) {
		teamId = kebabCase(`${name} ${hockeyType}`);

		if (some(teamsList, { slug: teamId })){
			const message = `A ${hockeyType.toLowerCase()} hockey team with this name already exists`; 
			errors.team.name = errors.name = message;
		}
	}

	
	if (!values.year) {
		errors.year = 'This field is required';
	}
	if (!values.quarter) {
		errors.quarter = 'This field is required';
	}
	if (values.year && !/^20\d{2}$/.test(values.year)) {
		errors.year = 'Please enter a year between 2000 - 2099';
	}	
	
	return errors;
}