import React from 'react';

import smartTable from '../../../hoc/smartTable.jsx';
import PlayerTableRow from './tbody.jsx';
import { selectPlayer } from '../../../actions/index';

const headings = [
	{text:'Last Name' ,val:'lastName'},
	{text:'First Name',val:'firstName'},
	{text:'Email', val:'email'},
	{text:'Phone', val:'phone'},
	{text:'Profile' ,val:null }
]

export default smartTable({
	headings,
	name: 'PlayerList',
	actions: { selectPlayer },
	searchInputHintText: 'Filter by name',
	rowPathname: 'player.list',
	category: 'lastName',
})(PlayerTableRow);