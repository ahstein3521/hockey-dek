import React, {Component} from 'react';
import { connect } from 'react-redux';

import TableHeaderColumns from './table-components/tableHeadings.jsx';
import BottomNav from './table-components/tableBottomNav.jsx';
import CustomTableBody from './table-components/tableBody.jsx';
import CircularProgress from 'material-ui/CircularProgress';

import { Table, TableHeader, TableFooter, TableRow, TableHeaderColumn } from 'material-ui/Table';


export default function(config) {
	
	return function(RowTemplate) {	
		
		class SmartTable extends Component{
			
			state = {
				rowsPerPage: 20,
				direction:'asc',
				sortCategory: config.category,
				searchText:'',
				currentPage:1,
			} 
				

			onPaginate = step => {
				const { currentPage } = this.state;
				const nextPage = currentPage + step;

				this.setState({ currentPage: nextPage });	
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
				
				if (this.props.isLoading) {
					return (	
						<CircularProgress 
							size={100} 
							style={{width:100, margin:'20% 40%'}} 
							thickness={6}
						/>
					)
				}
				return (
					<div style={{marginBottom: 30}}>
						<Table {...config.tableProps}>
	      			<TableHeader {...config.tableHeaderProps}>
	        			<TableHeaderColumns 
	        				{...this.state} 
	        				headings={config.headings} 
	        				onClick={this.onSort}
	        			/>
	        		</TableHeader>
	        		<CustomTableBody
	        			tableState={this.state}
	        			rowActions={config.actions}
	        			rowPathname={config.rowPathname}
	        			rowComponent={RowTemplate}
	        		/>				
							<TableFooter>
								<BottomNav
									rowsPerPage={this.state.rowsPerPage}
									currentPage={this.state.currentPage}
									rowPathname={config.rowPathname}
									numOfCols={config.headings.length}
									onSelect={this.onPaginate}
								/>
							</TableFooter>
						</Table>
					</div>
				)
		  }
		}
		return connect(state => ({isLoading: state.loading}))(SmartTable)
	}
}
