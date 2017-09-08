import React from 'react';
import { reduxForm } from 'redux-form';
import { fetchPrevRosters as fetchRosters } from '../../../actions/index';
import FormTemplate from '../new-game-form/teamFormTemplate.jsx';

const validate = values => {
  const errors = {};

  for (let prop in values) {
  	if (!values[prop]) {
  		errors[props] = 'Please make a selection';
  		return errors;
  	}
  }

  if (values.team1 === values.team2) {
  	errors.team2 = 'Please select a different team';
  }

  return errors;
}

export default reduxForm({
  form: 'SelectTeamsForGame',
  onSubmit: fetchRosters,
  destroyOnUnmount: false,
  validate
})(FormTemplate)
