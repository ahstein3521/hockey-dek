import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import Nav from './nav/index.jsx';
import Modal from './modals/main.jsx';
import TeamTable from './teams/roster/index.jsx';
import TeamMenu from './teams/search/main.jsx';
import PlayerPage from './players/index.jsx';
import SnackBar from './snackbar.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const style = {
	width:'90%',
	margin:'100px auto 0',
  minHeight: 400,
  // background:'#ECEFF1',
  // border:'1px solid #607D8B',	
}


class Content extends Component{

	render(){
		const { menuOpen} = this.props

		return(
			<div style={{paddingBottom:20}}>
				<Nav/>
				<div className={menuOpen? 'content-wrapper': 'content-wrapper-expanded'}>
					<div style={style} >
						<Route exact path='/teams' component={TeamMenu}/>
    				<Route path='/teams/roster' component={TeamTable}/>
						<Route path='/players' component={PlayerPage}/>
					</div>
				</div>
				<Modal/>
				<SnackBar/>
			</div>
		)		
}
}

function mapStateToProps({menu}){
	return {menuOpen:menu.open}
}

export default connect(mapStateToProps)(Content)
