import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import BasicInfo from './basicInfo.jsx';
import PlayerSetup from './players.jsx';

import { tabStyles as styles } from '../../../styles/index';
import { getInitialFormVals, getAllTeamIds } from '../../../selectors/updateTeam';
import { updateTeamPlayers } from '../../../actions/index';

class TeamSettings extends Component{
  
  state = { value: 1 };
  
  handleChange = (value) => this.setState({ value });
  
  updatePlayers = players => {
    const { teamInfo : { currentSeason: {_id}}} = this.props.settings;
    this.props.updateTeamPlayers(_id, players);
  }

  render(){
    const { settings, isLoading, teamsList } = this.props;
    
    if(isLoading) return <h2>Loading....</h2>
    const updateTeamPlayers = this.updatePlayers;
    const { availablePlayers, players, seasons, teamInfo } = settings;
    const playerLists = { players, availablePlayers, updateTeamPlayers };
    const formProps = { seasons, teamsList };

    return(      
      <Tabs
        value={this.state.value}
        tabItemContainerStyle={styles.container}
        inkBarStyle={styles.inkbar}
        onChange={this.handleChange}
      >
        <Tab label="Basic Info" style={styles.tab} value={1}>
          <BasicInfo initialValues={teamInfo} {...formProps}/>
        </Tab>
        <Tab label="Current Players" style={styles.tab} value={2}>
          <PlayerSetup {...playerLists}/>
        </Tab>              
      </Tabs>

    )
  }
}

  function mapState({ loading, ...state }){
    
  return { 
    settings: getInitialFormVals(state), 
    teamsList: getAllTeamIds(state), 
    isLoading: loading 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateTeamPlayers}, dispatch);
}

export default connect(mapState, mapDispatchToProps)(TeamSettings);