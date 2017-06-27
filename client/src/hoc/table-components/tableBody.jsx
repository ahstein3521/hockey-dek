import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeRowSelector } from '../../selectors/table';

import { TableRow, TableHeaderColumn, TableBody } from 'material-ui/Table';

import CircularProgress from 'material-ui/CircularProgress';

import { get as getFromPathStr } from 'lodash';

class CustomTableBody extends Component {
	static muiName = 'TableBody';



	renderRows() {
		const { rows, rowActions, dispatch } = this.props;
		const RowTemplate = this.props.rowComponent;
		const actions = bindActionCreators(rowActions, dispatch);
		
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

function mapStateToProps(state, ownProps) {
	const formatRows = makeRowSelector();
			
	return { 
		rows: formatRows(state, ownProps) 
	}
}

export default connect(mapStateToProps)(CustomTableBody)
