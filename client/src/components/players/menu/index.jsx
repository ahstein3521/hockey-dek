import React from 'react';

import smartTable from '../../../hoc/table.jsx';
import TableBody from './tbody.jsx';


const headings = [
	{text:'Last Name' ,val:'lastName'},
	{text:'First Name',val:'firstName'},
	{text:'Email', val:'email'},
	{text:'Phone' ,val:'phone' },
	{text:'Profile' ,val:null }
]

export default smartTable({
	headings,
	searchInputHintText: 'Filter by name',
	rowPathname: 'player.list',
	category: 'lastName',
})(TableBody);