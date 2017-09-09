import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';

const TableCheckbox = ({ checkIns, playerId, onCheck, ...game}) => 
	<Checkbox
		checked={Boolean(checkIns[playerId])}
		onCheck={(_, isChecked) => onCheck(playerId, isChecked, game)}
	/>

function mapState(state) {
	return {
		gameId: state.game.gameId,
		selectedTab: state.game.selectedTab,
		checkIns: state.game.checkIns
	}
}

export default connect(mapState)(TableCheckbox);