import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleCheckIn } from '../../../actions/index';
import List from './list.jsx';

const rootStyle = {
	width:'90%',
	margin:'0 auto 30px',
	display:'flex', 
	justifyContent:'space-around'
}

const GameComponent = ({ game, handleCheckIn, isLoading }) => {
	if (isLoading) return <h2>.......Loading</h2>
		
	return(
		<div style={rootStyle}>
			<List {...game.teams[0]} onCheck={handleCheckIn}/>
			<List {...game.teams[1]} onCheck={handleCheckIn}/>
		</div>
	)
}
function mapStateToProps(state){
	return { game: state.game, isLoading: state.loading };
}

function mapDispatchToProps(dispatch) {
		return bindActionCreators({ handleCheckIn }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);