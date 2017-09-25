import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { AutoComplete } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Toolbar from './toolbar.jsx';

const GameForm2 = props =>{
  const { handleSubmit, previousPage, availableTeams } = props;

  return (
    <span>
      <Toolbar title='Select two teams' />
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <Field
            component={AutoComplete}
            name="team1"
            dataSource={availableTeams}
            floatingLabelText="Select a team"
            filter={AutoComplete.caseInsensitiveFilter}  
            maxSearchResults={5}
            dataSourceConfig={{value:'values', text:'teamName'}}
          />
          <Field
            maxSearchResults={5}
            filter={AutoComplete.caseInsensitiveFilter}  
            component={AutoComplete}
            name="team2"
            dataSource={availableTeams}
            floatingLabelText="Select another team"
            dataSourceConfig={{value:'values',text:'teamName'}}
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
    </span>  
  )
}

function mapStateToProps(state) {
  const { game, loading } = state; 
  
  return { availableTeams: game.availableTeams, loading };
}

export default connect(mapStateToProps)(GameForm2)

