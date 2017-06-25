import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';
import BasicInfo from './BasicInfo.jsx';
import CheckIns from './Games.jsx';
import PaymentList from './Payments.jsx';
import Suspensions from './Suspensions.jsx';
import { tabStyles as styles } from '../../../styles/index';

class PlayerTabs extends Component{
  
  state = { value: 1 };
  
  handleChange = (value) => this.setState({ value });

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
    const { selected, loading, openModal } = this.props;
    if (loading) return this.renderSpinner();
      
    return(
        <Tabs
          value={this.state.value}
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
            <Suspensions player={selected} openModal={openModal}/>
          </Tab>        
        </Tabs>
    )
  }
}

function mapStateToProps({ player: { selected }, loading }){

  return { selected, loading }
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: (view, data) => 
      dispatch({type: 'OPEN_MODAL', payload: { view, data }})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTabs)