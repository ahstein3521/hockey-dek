import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {submitTeamSearch,  initTeamList} from '../../../actions/index';
import Banner from './banner.jsx';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { teamSearch as styles} from '../../../styles/index';
import { withRouter } from 'react-router-dom';

const getDataSource = (list) => (
	list.map(({name,_id, hockeyType, ...rest}) => ({
		text:name,
 		teamData:{name, _id, hockeyType, ...rest},
    value:(<MenuItem primaryText={name} secondaryText={hockeyType}/>)
  }))
);

class TeamMenu extends Component{

  componentDidMount(){
    const { teamList, initTeamList } = this.props;
    if(!teamList.length){
      initTeamList()
    }
  }//get basic team info list from database when this component loads

  onSubmit = ({teamData}) => {
    const { submitTeamSearch, history } = this.props;
    if(!teamData) return;
    submitTeamSearch(teamData);
    history.push('/team/roster');
  }
	
	render(){

		const { teamList, showRosterIcon } = this.props;
		return(
			<Card style={styles.card}>		
				<Banner showRosterIcon={showRosterIcon} />
				
				<div style={styles.wrapper}>
					<AutoComplete
						onNewRequest={this.onSubmit}
						fullWidth={true}
						floatingLabelText="Team Name:"
						name="name"
						maxSearchResults={5}
						floatingLabelStyle={styles.label}
			  		inputStyle={styles.input}
			  		underlineFocusStyle={styles.underline}
			  		filter={AutoComplete.caseInsensitiveFilter}  
						dataSource={getDataSource(teamList)}
					/>
				</div>
			</Card>
		)
	}
}

function mapStateToProps({teams:{list, selected} }){
  const showRosterIcon = !!selected.team;

  return { teamList:list, showRosterIcon };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({initTeamList, submitTeamSearch}, dispatch)
}

TeamMenu = withRouter(TeamMenu);

export default connect(mapStateToProps, mapDispatchToProps)(TeamMenu);

