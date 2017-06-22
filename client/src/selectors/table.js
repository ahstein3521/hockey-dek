import { createSelector } from 'reselect';
import { orderBy } from 'lodash';

const getRowData = state => state.rows;
const getTableProps = (_, props) => props


export const sortRows = () =>
 	createSelector(
		[ getRowData, getTableProps ],
			( rows, { sortCategory, direction, rowsPerPage, currentPage, searchText } ) => {
			  const rangeStart = (currentPage * rowsPerPage) - (rowsPerPage);
  			const rangeEnd = rangeStart + rowsPerPage;
				
				//If user entered text into the search field, filter the rows array
				//(Feature to be implement on the player list table)
  			if (searchText.trim().length) {
  				const regex = new RegExp(searchText, 'gi');
  				
  				return rows.filter(row => regex.test(row.fullName) )
  			}

  			//Sort the rows by category and then return a slice of that array that coincides with the 
  			//current set of results selected
				return orderBy(rows, sortCategory, direction)
					.slice(rangeStart, rangeEnd);
			}
	)
