import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import BasicInfo from './basicInfo.jsx';
import PlayerSetup from './players.jsx';

import { tabStyles as styles } from '../../../styles/index';
import { populateTeam as selector } from '../../../selectors/players';

class TeamSettings extends Component{
  
  state = { value: 1 };
  
  handleChange = (value) => this.setState({ value });
  
  render(){
    const { team, isLoading } = this.props;

    if(isLoading) return <h2>Loading....</h2>

    const { players, availablePlayers, ...inputVals } = team;
    const playerLists = { players, availablePlayers };

    return(
      <div style={{marginBottom:20}}>        
        <Paper zDepth={4}>
          <Tabs
            value={this.state.value}
            tabItemContainerStyle={styles.container}
            inkBarStyle={styles.inkbar}
            onChange={this.handleChange}
          >
            <Tab label="Basic Info" style={styles.tab} value={1}>
              <BasicInfo initialValues={inputVals} />
            </Tab>
            <Tab label="Current Players" style={styles.tab} value={2}>
              <PlayerSetup {...playerLists}/>
            </Tab>              
          </Tabs>
        </Paper>
      </div>
    )
  }
}

  function mapState({ loading, ...state }){

  return { team: selector(state), isLoading: loading }
}

export default connect(mapState)(TeamSettings);