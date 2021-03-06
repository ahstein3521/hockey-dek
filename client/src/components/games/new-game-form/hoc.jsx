import React, {Component} from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { Redirect } from 'react-router-dom';

export default function(ComposedComponent) {

	const GameComponent = props => {
		const { history, location, match } = props;
		const routerProps = { history, location, match }; 
		if (props.loading) {
			return (
        <CircularProgress 
          size={80} 
          thickness={3.5}
        />
      )
		}
		else if (props.gameId) {
			return <Redirect to='/games'/>
		} else {
			return <ComposedComponent {...routerProps}/>
		}
	}

	return connect(state => ({gameId: state.game.gameId, loading: state.loading}))(GameComponent);

}
