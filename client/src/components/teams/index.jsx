import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {submitTeamSearch,  initTeamList} from '../../actions/index';
import TeamTable from './roster/index.jsx';
import TeamMenu from './search/main.jsx';

class TeamPage extends Component{

  componentDidMount(){
    const { teamList, initTeamList } = this.props;
    if(!teamList.length){
      initTeamList()
    }
  }//get basic team info list from database when this component loads

  onSubmit = ({teamData}) => {
    const { submitTeamSearch } = this.props;
    if(!teamData) return;
    submitTeamSearch(teamData);
  }
  
  onSort = (sortBy) => {
    console.log(sortBy);
  }

  render(){
    const { teamList, selected, error } = this.props;
    
    return(
      <div>
        <TeamMenu
          onNewRequest={this.onSubmit}
          teamList={teamList}
        />
        {selected.team && 
          <TeamTable 
            selected={selected} 
            onSort={this.onSort}
          />
        }
      </div>
    )
  }
}


function mapState({teams:{list, selected}}){
  return {teamList:list, selected }
}

function mapDispatch(dispatch){
  return bindActionCreators({initTeamList, submitTeamSearch}, dispatch)
}

export default connect(mapState, mapDispatch)(TeamPage)