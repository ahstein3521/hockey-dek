import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton'
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';
import { suspendPlayer, openSnackbar } from '../../../actions/index';


let SuspensionForm = props => {
  const { handleSubmit, error, initialValues: {suspensions} } = props;
 
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row">
        <Field
          component={SelectField}
          fullWidth={true}
          name="currentSeason[0]._id"
          floatingLabelText="Team & Season"
        >
          {
            suspensions.map(({season}, i) => 
              <MenuItem 
                primaryText={season.team.name}
                secondaryText={season.formatted}
                key={i} 
                value={season._id}
              />
            )
          }
        </Field>
      </div>
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
      <div className="btn-group">
        <RaisedButton
          type="submit"
          label="Suspend Player"
          secondary={true}
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
