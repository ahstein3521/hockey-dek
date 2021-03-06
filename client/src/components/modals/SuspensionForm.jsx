import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton'
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';
import { suspendPlayer, openSnackbar } from '../../actions/index';


let SuspensionForm = props => {
  const { handleSubmit, error } = props;
  
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row">
        <Field
          name="start" 
          component={DatePicker}
          format={null}
          floatingLabelText="Start Date"
        />
        <Field
          name="end" 
          component={DatePicker}
          fullWidth={true} 
          format={null}
          floatingLabelText="End Date"
        />
      </div>    
      <div className="form-row">
        <Field
          name="reason"
          fullWidth={true}
          component={TextField}
          floatingLabelText="Reason for suspension"
        />
      </div>
    </form>
  )
}

export default reduxForm({
  form:'SuspensionForm',
  onSubmit: suspendPlayer,
  onSubmitSuccess: openSnackbar,


})(SuspensionForm)

