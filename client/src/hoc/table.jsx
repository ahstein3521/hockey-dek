import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from 'material-ui/Paper';

import { orderBy } from 'lodash';


export default function({ headers, rows }) {

		return class SmartTable extends Component{
			
			state = {
				sortCategory: 'name',
				direction: 'asc',
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
		
				return (
					<Table 
						onSort={this.onSort}
						sortProps={this.state}
						onSelect={this.onSelect}
						openModal={openModal}
						teams={SortRows(teams, this.state)}
					/>
				)
		  }
		}
}



