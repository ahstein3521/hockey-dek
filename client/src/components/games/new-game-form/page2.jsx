import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { AutoComplete } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { fetchRosters } from '../../../actions/index';
import { formValueSelector } from 'redux-form';
import formatDate from '../../utils/formatDate';

const GameForm2 = props =>{
  const { handleSubmit, previousPage } = props;
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div style={{textAlign:'center'}}>
        <p> <b>Game Date:</b> { formatDate(props.date)} </p>
      </div>
      <div className="form-row">
        <Field
          component={AutoComplete}
          name="team1"
          dataSource={props.teams}
          floatingLabelText={`Select a ${props.hockeyType} hockey team`}
          filter={AutoComplete.caseInsensitiveFilter}  
          maxSearchResults={5}
          dataSourceConfig={{value:'currentSeason',text:'name'}}
        />
        <Field
          maxSearchResults={5}
          filter={AutoComplete.caseInsensitiveFilter}  
          component={AutoComplete}
          name="team2"
          dataSource={props.teams}
          floatingLabelText="Select another team"
          dataSourceConfig={{value:'currentSeason',text:'name'}}
        />        
      </div>  
      <div className="btn-group">
        <RaisedButton
          type="button"
          label="Back"
          className="form-btn"
          onTouchTap={()=> previousPage()}
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
  const selector = formValueSelector('CreateGame');
  const teamList = state.teams.list;
  
  const { hockeyType, date } = selector(state, 'hockeyType', 'date');
  const teams = teamList.filter(team => team.hockeyType === hockeyType); 
  
  return { teams, hockeyType, date };
}

const connectedGameForm = connect(mapStateToProps)(GameForm2)

// Decorate with redux-form
export default reduxForm({
  form: 'CreateGame',
  onSubmit: fetchRosters,
  destroyOnUnmount: false
  
})(connectedGameForm)
