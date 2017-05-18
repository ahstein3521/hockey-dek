import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {withRouter} from 'react-router-dom';
import {fetchPlayerDetails} from '../../../actions/index';

import Table from './table.jsx';
import Toolbar from './toolbar.jsx';
import Paper from 'material-ui/Paper';


class TeamRoster extends Component{
	onSelect = (player) => {
		const {history, fetchPlayerDetails} = this.props
		const redirect = () => history.push("/players");
		fetchPlayerDetails(player, redirect);
	}
	onSort = ()=> {

	}
	render(){
		const {selected} = this.props;

		return (
			<Paper zDepth={3}>
				<Toolbar selected={selected} />
				<Table onSelect={this.onSelect} selected={selected}/>
			</Paper>
			)
  }
}

TeamRoster = withRouter(TeamRoster);

function mapDispatch(dispatch){
	return bindActionCreators({fetchPlayerDetails}, dispatch);
}
export default connect(null, mapDispatch)(TeamRoster)
