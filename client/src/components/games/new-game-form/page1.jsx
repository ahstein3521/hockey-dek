import React from 'react';
import { reduxForm, Field } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton } from 'material-ui/RadioButton';
import { RadioButtonGroup, DatePicker } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import formatDate from '../../utils/formatDate';

const validate = values => {
  const errors = {};

  if (!values.date) {
    errors.date = 'Please select a date';
  }
  if (!values.hockeyType) {
    errors.hockeyType = 'Please select a hockey type';
  }
  return errors;
}

function getNextPage(form, dispatch, props) {
  const pathname = '/games/new/2';
  const state = { 
    title: `${form.hockeyType} hockey game`, 
    subtitle: formatDate(form.date)
  };

  return props.history.push({ pathname, state })
}

const GameForm1 = props =>{
  const {handleSubmit} = props;
  return (
    <form 
      className="form"
      onSubmit={handleSubmit}
    >
      <Field
        name="date" 
        component={DatePicker}
        fullWidth={true} 
        format={null}
        formatDate={formatDate}
        autoOk={true} 
        floatingLabelText="Game Date"
      />
      <Field
        component={RadioButtonGroup}
        name="hockeyType"
        style={{paddingTop:25, marginBottom:10}}
      >
        <RadioButton  label="Dek" value="Dek"/>
        <RadioButton label="Roller" value="Roller"/>
      </Field>
      <div className="btn-group">    
        <RaisedButton
          type="submit"
          label="Next"
          className="form-btn"
          primary={true}
        />
      </div>
    </form>
  )
}


// Decorate with redux-form
export default reduxForm({
  form: 'CreateGame',
  destroyOnUnmount: false,
  onSubmit: getNextPage,
  validate 
})(GameForm1)
