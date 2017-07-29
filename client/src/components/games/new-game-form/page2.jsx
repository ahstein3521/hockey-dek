import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { AutoComplete } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { fetchRosters } from '../../../actions/index';

import { getAvailableTeams } from '../../../selectors/games';

const validate = values => {
  const errors = {};

  if (!values.team1) errors.team1 = 'Please select a team';
  else if (!values.team1) errors.team2 = 'Please select a  second team';
  else if (values.team2 && values.team2 == values.team1) errors.team2 = 'Select a different team';

  return errors;
}

const GameForm2 = props =>{
  const { handleSubmit, previousPage, formVals } = props;
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <Field
          component={AutoComplete}
          name="team1"
          dataSource={formVals.teams}
          floatingLabelText="Select a  team"
          filter={AutoComplete.caseInsensitiveFilter}  
          maxSearchResults={5}
          dataSourceConfig={{value:'currentSeason',text:'name'}}
        />
        <Field
          maxSearchResults={5}
          filter={AutoComplete.caseInsensitiveFilter}  
          component={AutoComplete}
          disabled={formVals.teamTwoInputDisabled}
          name="team2"
          dataSource={formVals.teams}
          floatingLabelText="Select another team"
          dataSourceConfig={{value:'currentSeason',text:'name'}}
        />        
      </div>  
      <div className="btn-group">
        <RaisedButton
          type="button"
          label="Back"
          className="form-btn"
          onTouchTap={()=> props.history.goBack()}
          secondary={true}
        />          
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

function mapStateToProps(state){
    const getFormVals = getAvailableTeams();

    return { formVals: getFormVals(state) };
}

const connectedGameForm = connect(mapStateToProps)(GameForm2)

// Decorate with redux-form
export default reduxForm({
  form: 'CreateGame',
  onSubmit: fetchRosters,
  destroyOnUnmount: false,
  validate
  
})(connectedGameForm)
