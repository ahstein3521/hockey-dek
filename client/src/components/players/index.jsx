import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {submitPlayerSearch,  fetchPlayerNames, updatePlayer} from '../../actions/index';
import PlayerMenu from './Search.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import BasicInfo from './BasicInfo.jsx';
import CheckIns from './Games.jsx';
import Paper from 'material-ui/Paper';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tab:{
    color:'#37474F',
    fontWeight:'bold'
  }
};

class PlayerPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  componentDidMount(){
    const { playerList, fetchPlayerNames } = this.props;
    if(!playerList.length){
      fetchPlayerNames()
    }
  }//get basic team info list from database when this component loads

  onSubmit = ({playerData}) => {
    //console.log(playerData)
    this.props.submitPlayerSearch(playerData);
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
              tabItemContainerStyle={{background:'#FFECB3', color:'black'}}
              inkBarStyle={{background:'#FB8C00', color:'black'}}
              onChange={this.handleChange}
            >
              <Tab label="Basic Info" style={styles.tab} value="a">
                <BasicInfo player={selected.basicInfo} updatePlayer={updatePlayer}/>
              </Tab>
              <Tab label="Check-ins" style={styles.tab} value="b">
                <CheckIns games={selected.games}/>
              </Tab>        
              <Tab label="Payments" style={styles.tab} value="c">
                <div>
                  <h2 style={styles.headline}>Payments </h2>
                </div>
              </Tab>
              <Tab label="Suspensions" style={styles.tab} value="d">
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
  return bindActionCreators({fetchPlayerNames, submitPlayerSearch, updatePlayer}, dispatch)
}

export default connect(mapState, mapDispatch)(PlayerPage)