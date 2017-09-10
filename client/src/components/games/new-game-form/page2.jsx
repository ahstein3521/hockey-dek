import React from 'react';
import { reduxForm } from 'redux-form';
import { fetchRosters } from '../../../actions/index';
import FormTemplate from './teamFormTemplate.jsx';

const validate = values => {
  const errors = {};

  if (!values.team1) errors.team1 = 'Please select a team';
  else if (!values.team1) errors.team2 = 'Please select a  second team';
  else if (values.team2 && values.team2 == values.team1) errors.team2 = 'Select a different team';

  return errors;
}

export default reduxForm({
  form: 'CreateGame',
  onSubmit: fetchRosters,
  validate
  
})(FormTemplate)
