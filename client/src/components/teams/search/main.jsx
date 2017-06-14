import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {submitTeamSearch } from '../../../actions/index';


import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import { Card } from 'material-ui/Card';

import { teamSearch as styles } from '../../../styles/index';

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
    const { currentSeason: {formatted}, name } = teamData;
    submitTeamSearch(teamData);
    history.push('/teams/roster', {title: name, subtitle: formatted});
  }
	
	render(){

		const { teamList } = this.props;

		return(
				
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
		)
	}
}

function mapStateToProps({teams:{ list } }){
  return { teamList:list };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ submitTeamSearch }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMenu);

