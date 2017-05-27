import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchPlayerDetails } from '../../../actions/index';

import Table from './table.jsx';
import Toolbar from './toolbar.jsx';
import Paper from 'material-ui/Paper';


import IconButton from 'material-ui/IconButton';
import ReturnIcon from 'material-ui/svg-icons/navigation/arrow-back';

import { AccentColor } from '../../../styles/theme';

import { orderBy } from 'lodash';

const SortRows = ( selected, state ) => {
	
	const { sortCategory, direction } = state;
	let { team } = selected;
	let { players } = team;
	players = orderBy(players, sortCategory, direction);

	return {...selected, team: {...team, players}};
}

class TeamRoster extends Component{
	
	state = {
		sortCategory: 'lastName',
		direction: 'asc'
	}

	onSelect = (player) => {
		const {history, fetchPlayerDetails} = this.props
		const redirect = () => history.push("/players");
		fetchPlayerDetails(player, redirect);
	}
	onSort = columnClicked => {
		const { sortCategory, direction } = this.state;
		let newCategory = columnClicked;
		let newDirection = 'asc';

		if(!columnClicked) return;

		if(columnClicked === sortCategory ){
			newDirection = direction === 'asc' ? 'desc' : 'asc';
		}
		this.setState({ 
			direction: newDirection,
			sortCategory: newCategory
		}); 
	}

	render(){
		const { selected, isLoading } = this.props;

		if(isLoading) return <h2>Loading</h2>;
		console.log('rendering table');
		return (
			<div>
        <Link to='/team'>
          <IconButton 
            iconStyle={{color:AccentColor}} 
            tooltip="Return to menu"
          >
            <ReturnIcon/>
          </IconButton>
        </Link>			
				<Paper zDepth={3}>
					<Toolbar selected={selected} />
					<Table 
						onSelect={this.onSelect} 
						onSort={this.onSort}
						sortProps={this.state}
						selected={SortRows(selected, this.state)}
					/>
				</Paper>
			</div>
			)
  }
}

TeamRoster = withRouter(TeamRoster);

function mapState({teams, loading}){

	return { selected: teams.selected, isLoading: loading }
}

function mapDispatch(dispatch){
	return bindActionCreators({fetchPlayerDetails}, dispatch);
}
export default connect(mapState, mapDispatch)(TeamRoster)
