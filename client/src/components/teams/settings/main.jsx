import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import BasicInfo from './basicInfo.jsx';
import PlayerSetup from './players.jsx';

import { tabStyles as styles } from '../../../styles/index';
import { updateTeamPlayers } from '../../../actions/index';

class TeamSettings extends Component{
  
  state = { 
    tabValue: 1,
    searchText: '',
    added: [],
    removed: [],
  };
  
  handleChange = (tabValue) => this.setState({ tabValue });
  

  addPlayer = ({playerData}) => 
    this.setState({ added: [...this.state.added, playerData._id], searchText:''})
  

  undoRemovePlayer = player => {
    let [...removed] = this.state.removed;
    const index = removed.indexOf(player._id);
    removed.splice(index, 1);

    this.setState({ removed })
  }

  removePlayer = player => {
    const [...added] = this.state.added;
   
    const addedIndex = added.indexOf(player._id);

    if (addedIndex !== -1) {
      added.splice( addedIndex, 1);
    }
    
    
    this.setState({ added, removed: [ ...this.state.removed, player._id ] });

  }

  handleReset = () => 
    this.setState({ added: [], removed: [] })


  updatePlayers = (players, season) => {  
    this.props.updateTeamPlayers(season, players);
    this.setState({ added: [], removed: [] });
  }

  render(){
    const { isLoading } = this.props;
    const { tabValue, ...rest } = this.state;
    
    if(isLoading) return <h2>Loading....</h2>
    const updateTeamPlayers = this.updatePlayers;


    return(      
      <Tabs
        value={this.state.tabValue}
        tabItemContainerStyle={styles.container}
        inkBarStyle={styles.inkbar}
        onChange={this.handleChange}
      >
        <Tab label="Basic Info" style={styles.tab} value={1}>
          <BasicInfo />
        </Tab>
        <Tab label="Current Players" style={styles.tab} value={2}>
          <PlayerSetup
            handleSubmit={this.updatePlayers}
            handleReset={this.handleReset} 
            updateInput={text => this.setState({searchText: text})}
            undoRemovePlayer={this.undoRemovePlayer}
            addPlayer={this.addPlayer}
            removePlayer={this.removePlayer}
            {...rest}
          />
        </Tab>              
      </Tabs>
    )
  }
}

  function mapState({ loading }){

    return { isLoading: loading }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateTeamPlayers}, dispatch);
}

export default connect(mapState, mapDispatchToProps)(TeamSettings);