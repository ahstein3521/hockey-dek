import React from 'react';
import { Field } from 'redux-form';
import { SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

let yearList = [];
const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];

(function() {
	let year = new Date().getFullYear();
	const start = 2016;

	while (year >= start) {
		yearList.push(year);
		year--;
	}

})();

const SeasonSelectFields = props => {
	return (
		<div className='form-row'>
			<Field
				component={SelectField}
				floatingLabelText='Season'
				name='quarter'
			>
				{
					seasons.map((season,i) => 
						<MenuItem
							key={i}
							primaryText={season}
							value={i+1}
						/>
					)
				}
			</Field>
			<Field
				component={SelectField}
				floatingLabelText='Year'
				name='year'
			>
				{
					yearList.map(year => 
						<MenuItem key={year} primaryText={year} value={year}/>
					)
				}
			</Field>
		</div>
	)
} 

export default SeasonSelectFields;