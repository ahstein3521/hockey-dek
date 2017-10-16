import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

import NavigationArrows from './navigation.jsx';
import Nav from './nav/index.jsx';
import Modal from './modals/main.jsx';
import SnackBar from './snackbar.jsx';

import TeamPage from './teams/index.jsx';
import PlayerPage from './players/index.jsx';
import GamesPage from './games/index.jsx';
import SuspensionForm from './modals/SuspensionForm.jsx';

import { Route, Link } from 'react-router-dom';

const style = {
	width:'90%',
	margin:'100px auto 0',
  minHeight: 400
}


class Content extends Component {
	
	render(){
		const { menuOpen, location } = this.props
		const selectedCategory = location.pathname.length > 1;
		const gameView = /\/games/.test(location.pathname);
		return(
			<div style={{paddingBottom:20}}>
				<Route path="/" component={Nav}/>
				<div className={menuOpen? 'content-wrapper': 'content-wrapper-expanded'}>
					<div style={style} >
						{
							selectedCategory && !gameView &&
								<Route path='/' component={NavigationArrows}/>
						}
						<TeamPage/>
						<PlayerPage/>
						<GamesPage/>
					</div>
				</div>
				<Modal/>
				<SnackBar/>
			</div>
		)		
}
}

function mapStateToProps({menu}){
	return { menuOpen:menu.open };
}

export default connect(mapStateToProps)(Content)
