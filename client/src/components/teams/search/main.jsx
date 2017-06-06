import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {submitTeamSearch, openModal } from '../../../actions/index';
import Banner from './banner.jsx';
import BottomNav from './bottomNavigation.jsx';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { teamSearch as styles } from '../../../styles/index';
import { withRouter, Route } from 'react-router-dom';

const getDataSource = (list) => (
	list.map(({name,_id, hockeyType, ...rest}) => ({
		text:name,
 		teamData:{name, _id, hockeyType, ...rest},
    value:(<MenuItem primaryText={name} secondaryText={hockeyType}/>)
  }))
);

class TeamMenu extends Component{

  onSubmit = ({teamData}) => {
    const { submitTeamSearch, history } = this.props;
    if(!teamData) return;
    submitTeamSearch(teamData);
    history.push('/teams/roster');
  }
	
	render(){

		const { teamList, openModal } = this.props;

		return(
			<Card style={styles.card}>		
				<Banner openModal={openModal}/>
				<div style={styles.wrapper}>
					<AutoComplete
						onNewRequest={this.onSubmit}
						fullWidth={true}
						floatingLabelText="Team Name:"
						name="name"
						maxSearchResults={5}
			  		filter={AutoComplete.caseInsensitiveFilter}  
						dataSource={getDataSource(teamList)}
					/>
				</div>
			</Card>
		)
	}
}

function mapStateToProps({teams:{ list } }){
  return { teamList:list };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ submitTeamSearch, openModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMenu);

