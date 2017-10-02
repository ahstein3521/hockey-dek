import { createSelector } from 'reselect';
import { orderBy, get as getFromPathStr } from 'lodash';

const getRowData = (state, { rowPathname }) => getFromPathStr(state, rowPathname, []);
const getTableState = (state, { tableState }) => tableState; 


export const makeRowSelector = () =>
 	createSelector(
		[ getRowData, getTableState ],
			( rows, { sortCategory, direction, rowsPerPage, currentPage, searchText } ) => {
			  const rangeStart = (currentPage * rowsPerPage) - (rowsPerPage);
  			const rangeEnd = rangeStart + rowsPerPage;
				
				//If user entered text into the search field, filter the rows array
				//(Feature to be implement on the player list table)
  			// if (searchText.trim().length) {
  			// 	const regex = new RegExp(searchText, 'gi');
  				
  			// 	return rows.filter(row => regex.test(row.fullName) )
  			// }

  			//Sort the rows by category and then return a slice of that array that coincides with the 
  			//current set of results selected
  		
				return orderBy(rows, sortCategory, direction)
					.slice(rangeStart, rangeEnd);
			}
	)

export const makeTableStateSelector = () => 
 	createSelector(
		[ getRowData, getTableState, getTableConfig ],
			( rows, table, { name } ) => {
				console.log(rows, table, name, 'selector')
				return {
					...table,
					total: rows.length,
					name
				}
			}
	)

