import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeRowSelector } from './selector';

import { TableRow, TableHeaderColumn, TableBody } from 'material-ui/Table';


class CustomTableBody extends Component {
	static muiName = 'TableBody';



	renderRows() {
		const { rows, rowActions, dispatch } = this.props;
		const RowTemplate = this.props.rowComponent;
		let actions = {};
		
		if (rowActions) {
			actions = bindActionCreators(rowActions, dispatch);
		}
		
		return	rows.map((rowData, i) => 
				<RowTemplate key={i} {...rowData} {...actions}/>
			) 	
	}

	render() {
		
		return(	
		  <TableBody
				prescanRows={false}
				showRowHover={true}
				displayRowCheckbox={false}
			>
				{this.renderRows()}
			</TableBody>
		)	
	}
}
const formatRows = makeRowSelector();

function mapStateToProps(state, ownProps) {	
	return { 
		rows: formatRows(state, ownProps) 
	}
}

export default connect(mapStateToProps)(CustomTableBody)
