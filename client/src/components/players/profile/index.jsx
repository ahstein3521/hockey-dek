import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import BasicInfo from './BasicInfo.jsx';
import CheckIns from './Games.jsx';
import PaymentList from './Payments.jsx';

import { tabStyles as styles } from '../../../styles/index';

class PlayerTabs extends Component{
  
  state = { value: 1 };
  
  handleChange = (value) => this.setState({ value });

  render(){
    const { selected, loading } = this.props;
    if (loading) return <h2>Loading....</h2>
      
    return(
        <Tabs
          value={this.state.value}
          tabItemContainerStyle={styles.container}
          inkBarStyle={styles.inkbar}
          onChange={this.handleChange}
        >
          <Tab label="Basic Info" style={styles.tab} value={1}>
            <BasicInfo initialValues={selected.basicInfo} />
          </Tab>
          <Tab label="Check-ins" style={styles.tab} value={2}>
            <CheckIns games={selected.games}/>
          </Tab>        
          <Tab label="Payments" style={styles.tab} value={3}>
            <PaymentList payments={selected.payments}/>
          </Tab>
          <Tab label="Suspensions" style={styles.tab} value={4}>
            <div>
              <h2 style={styles.headline}>Suspensions</h2>
            </div>
          </Tab>        
        </Tabs>
    )
  }
}

function mapState({ player: { selected }, loading }){
  
  return { selected, loading }
}


export default connect(mapState)(PlayerTabs)