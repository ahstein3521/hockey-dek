import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sortRows } from '../selectors/table';

import TableHeaderColumns from '../components/common/tableHeadings.jsx';
import BottomNav from '../components/common/tableBottomNav.jsx';

import { Table, TableHeader, TableFooter, TableRow, TableHeaderColumn } from 'material-ui/Table';

import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';

import { get as getObjAtPath } from 'lodash';
import { primary1Color } from '../../theme';

export default function(config) {
	
	return function(ComposedTBody) {	
	
		class SmartTable extends Component{
			
			state = {
				rowsPerPage: 20,
				//TODO - dynamically set rows per page w/ dropdown input on table footer
				currentPage: 1,
				sortCategory: config.category,
				direction: 'asc',
				searchText:'',
			}

			onPaginate = step => {
				const { rowsPerPage, currentPage } = this.state;
				const { rows } = this.props;

				const nextPage = currentPage + step;
				const maxPage = Math.ceil(rows.length / rowsPerPage); 
				
				this.setState({currentPage: nextPage})
			}

			onSearch = (event, searchText) => {
				this.setState({ searchText });
			}

			onSort = columnClicked => {
				const { sortCategory, direction } = this.state;
				let newCategory = columnClicked;
				let newDirection = 'asc';

				if (!columnClicked) return;

				if (columnClicked === sortCategory ) {
					newDirection = direction === 'asc' ? 'desc' : 'asc';
				}
				
				this.setState({ 
					direction: newDirection,
					sortCategory: newCategory
				}); 
			}

			render(){
		    if ( this.props.isLoading ) return (
		      <CircularProgress size={100} style={{width:100, margin:'20% 40%'}} thickness={6}/>
		    ); 				
				
				return (
					<div style={{marginBottom: 30}}>
						<Table>
	      			<TableHeader>
	        			<TableHeaderColumns 
	        				{...this.state}
	        				headings={config.headings} 
	        				onClick={this.onSort}
	        			/>
	        		</TableHeader>
							<ComposedTBody rows={this.props.rows} {...config} {...this.state}/>
							{	!this.state.searchText.trim().length &&	
								<TableFooter>
									<BottomNav
										{...this.state}
										numOfCols={config.headings.length}
										total={this.props.rows.length}
										onSelect={this.onPaginate}
									/>
								</TableFooter>
							}	
						</Table>
					</div>
				)
		  }
		}

		function mapStateToProps(state) {
			
			const rows = getObjAtPath(state, config.rowPathname, []);

			return { isLoading: state.loading, rows }
		}

		return connect(mapStateToProps)(SmartTable);
	}
}

	      			// 	<TableRow>
	      			// 		<TableHeaderColumn style={{textAlign:'right'}} colSpan={config.headings.length-2}>
	      			// 			<TextField
										// 	floatingLabelText={config.searchInputHintText}
										// 	value={this.state.searchText}
										// 	onChange={this.onSearch}
										// />
	      			// 		</TableHeaderColumn>
	      			// 	</TableRow>