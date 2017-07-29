import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal, selectPlayerTab } from '../../../actions/index';
import {Tabs, Tab} from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';
import BasicInfo from './BasicInfo.jsx';
import CheckIns from './Games.jsx';
import PaymentList from './Payments.jsx';
import Suspensions from './Suspensions.jsx';
import { tabStyles as styles } from '../../../styles/index';

class PlayerTabs extends Component{
  
  handleChange = tab => 
    this.props.onSelect(tab)

  renderSpinner() {
    return (
      <CircularProgress 
        size={100} 
        style={{width:100, margin:'20% 40%'}} 
        thickness={6}
      />
    )
  }

  render(){
    const { player, loading, openModal } = this.props;
    if (loading) return this.renderSpinner();
      
    return(
        <Tabs
          value={this.props.tab}
          inkBarStyle={styles.inkbar}
          onChange={this.handleChange}
        >
          <Tab label="Basic Info" style={styles.tab} value={1}>
            <BasicInfo initialValues={player.basicInfo} />
          </Tab>
          <Tab label="Check-ins" style={styles.tab} value={2}>
            <CheckIns games={player.games}/>
          </Tab>        
          <Tab label="Payments" style={styles.tab} value={3}>
            <PaymentList payments={player.payments} openModal={openModal}/>
          </Tab>
          <Tab label="Suspensions" style={styles.tab} value={4}>
            <Suspensions player={player} />
          </Tab>        
        </Tabs>
    )
  }
}

function mapStateToProps({ player:{selected}, loading }){

  const { tab = 1, ...rest } = selected;

  return { player: rest, loading, tab };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { openModal, onSelect:selectPlayerTab }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTabs)