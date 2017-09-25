import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';
import { suspendPlayer, openSnackbar } from '../../../actions/index';


const SuspensionForm = props => {
  const { openModal } = props;
  
  return (
    <form onSubmit={props.handleSubmit} className="form">
      {
        props.showDeleteButton && 
        <div className='btn-group'>
          <FlatButton
            icon={<DeleteIcon/>}
            label="Delete"
            onTouchTap={() => {
              props.history.goBack();
              openModal({view:'deleteSuspension' , data: props.initialValues})
            }}
            secondary={true}
          />
        </div>
      }
      <div className="form-row">
        <Field
          component={TextField}
          fullWidth={true}
          name='seasonDisplay'
          disabled={true}
          floatingLabelText="Team & Season"
        />
      </div>
      <div className="form-row">
        <Field
          autoOk={true}
          name="start" 
          component={DatePicker}
          format={v => v? new Date(v) : new Date()}
          floatingLabelText="Start Date"
        />
        <Field
          autoOk={true}
          name="end" 
          component={DatePicker}
          format={v => v? new Date(v) : new Date()}
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
          className="form-btn"
          type="submit"
          label="Submit"
          primary={true}
        />
        <RaisedButton
          label="Reset"
          onTouchTap={props.reset}
          secondary={true}
        />
      </div>
    </form>
  )
}

export default SuspensionForm;