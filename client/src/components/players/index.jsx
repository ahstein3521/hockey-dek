import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchPlayerDetails, updatePlayer} from '../../actions/index';
import PlayerMenu from './Search.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import BasicInfo from './BasicInfo.jsx';
import CheckIns from './Games.jsx';
import Paper from 'material-ui/Paper';
import PaymentList from './Payments.jsx';

import { tabStyles as styles } from '../../styles/index';

class PlayerPage extends Component{
  
  state = { value: 1 };
  
  handleChange = (value) => this.setState({ value });

  onSubmit = ({playerData}) => {
    this.props.fetchPlayerDetails(playerData);
  }
  
  render(){
    const { playerList, selected, error, updatePlayer } = this.props;

    return(
      <div style={{marginBottom:20}}>
        <PlayerMenu
          onNewRequest={this.onSubmit}
          playerList={playerList}
        />
        {
          selected &&
          
          <Paper zDepth={4}>
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
          </Paper>
    
        }
      </div>
    )
  }
}

function mapState({player: { list, selected }}){
  
  return {playerList:list, selected }
}

function mapDispatch(dispatch){
  return bindActionCreators({fetchPlayerDetails , updatePlayer}, dispatch)
}

export default connect(mapState, mapDispatch)(PlayerPage)