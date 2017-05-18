import React from 'react';
import { reduxForm, Field } from 'redux-form'
import { SelectField } from 'redux-form-material-ui';

const renderSelectField = props => (
  <SelectField
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    fullWidth={true}
		floatingLabelStyle={{color:'#2E7D32', fontSize:'1.3em'}}
  	inputStyle={{color:'#2E7D32',fontSize:'1.5em'}}
    {...props}
   >
  </SelectField>
)

export default renderSelectField;