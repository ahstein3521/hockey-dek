import React from 'react';

import smartTable from '../../../hoc/table.jsx';
import TableBody from './tbody.jsx';


const headings = [
	{text:'Team Name',val:'name', colSpan:2},
	{text:'Hockey Type' ,val:'hockeyType'},
	{text:'Current Season', val:'currentSeason.year'},
	{text:'Edit' ,val:null },
	{text:'Delete' ,val:null }
]

export default smartTable({
	headings,
	searchInputHintText: 'Filter team name',
	rowPathname: 'teams.list',
	category: 'name',
})(TableBody);