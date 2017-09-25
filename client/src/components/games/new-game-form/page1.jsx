import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { filterTeams } from '../../../actions/index';
import MenuItem from 'material-ui/MenuItem';

import { SelectField, DatePicker } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import DropDowns from './dropdowns.jsx'

import formatDate from '../../utils/formatDate';

import CheckInList from '../checkin-list/index.jsx';
import Toolbar from './toolbar.jsx';


const validate = values => {
  const errors = {};

  for (let field in values) {
    if (!values[field]) {
      errors[field] = 'Please make a selection';
    }
  }
  return errors;
}

function getNextPage(form, dispatch, props) {
  const pathname = '/games/new/2';
  const state = { 
    title: `${props.values.hockeyType} hockey game`, 
    subtitle: formatDate(props.values.date)
  };

  return props.history.push({ pathname, state })

}

const GameForm1 = props =>{
  const {handleSubmit} = props;
  return (
    <span>
      <Toolbar title='Start a new game, or find an old one.'/>
      <form 
        className="form"
        onSubmit={handleSubmit}
      >
        <DropDowns/>
        <div className='form-row'>
          <Field
            name="date" 
            component={DatePicker}
            format={null}
            formatDate={formatDate}
            autoOk={true} 
            floatingLabelText="Game Date"
          />
          <Field
            component={SelectField}
            floatingLabelText="Hockey Type"
            name="hockeyType"
          >
            <MenuItem primaryText="Dek" value="Dek"/>
            <MenuItem primaryText="Roller" value="Roller"/>
          </Field>
        </div>
        <div className="btn-group">    
          <RaisedButton
            type="submit"
            label="Next"
            className="form-btn"
            primary={true}
          />
        </div>
      </form>
    </span>  
  )
}



// Decorate with redux-form
export default reduxForm({
  form: 'CreateGame',
  destroyOnUnmount: false,
  onSubmit: filterTeams,
  onSubmitSuccess: getNextPage,
  validate 
})(GameForm1)
