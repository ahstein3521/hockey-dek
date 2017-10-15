import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import BasicInfo from './basicInfo.jsx';
import PlayerSetup from './Roster.jsx';
import { tabStyles as styles } from '../../../styles/index';


class TeamSettings extends Component {
  
  state = { 
    tabValue: 1,
  };
  
  handleChange = tabValue => 
    this.setState({ tabValue })
  

  render(){
    const { isLoading } = this.props;
    
    
    if (isLoading) return <h2>Loading....</h2>
    
    return(      
      <Tabs
        inkBarStyle={styles.inkbar}
        onChange={this.handleChange}
        tabItemContainerStyle={styles.container}
        value={this.state.tabValue}
      >
        <Tab 
          label="Basic Info" 
          style={styles.tab} 
          value={1}
          >
          <BasicInfo />
        </Tab>
        <Tab 
          label="Current Players" 
          style={styles.tab} 
          value={2}
          >
          <PlayerSetup/>
        </Tab>                      
      </Tabs>
    )
  }
}




  function mapState({ loading }) {
    return { isLoading: loading }
}

export default connect(mapState)(TeamSettings);