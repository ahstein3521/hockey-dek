import React from 'react';
import { reduxForm, Field } from 'redux-form'
import { TextField, SelectField, AutoComplete } from 'redux-form-material-ui';

const blueGrey = '#546E7A';
const teal = '#00897B';

const labelStyle = {
	color:teal,
	fontWeight:'bold'
}

const renderTextField = props => (
	<TextField
		floatingLabelText={`${props.label}`}
		floatingLabelStyle={labelStyle}
		underlineStyle={{borderColor:blueGrey, height:'7px'}}
		underlineFocusStyle={{borderColor:teal}}
		errorText={props.touched && props.error}
		{...props}
	/>
)

export const renderSelectField = props => (
  <SelectField
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    fullWidth={true}
		floatingLabelStyle={labelStyle}   
  	underlineStyle={{borderColor:blueGrey, height:'7px'}}
  	inputStyle={{color:'#2E7D32',fontSize:'1.5em'}}
    {...props}
   >
  </SelectField>
)

export const renderAutoComplete = props => (
  <AutoComplete
    {...props}
    floatingLabelStyle={labelStyle}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    fullWidth={true}
		underlineStyle={{borderColor:blueGrey, height:'7px'}}
		underlineFocusStyle={{borderColor:teal}} 
		inputStyle={{color:'#2E7D32',fontSize:'1.5em'}}    
  	filter={AutoComplete.caseInsensitiveFilter}  
  />
  
)

export default renderTextField;