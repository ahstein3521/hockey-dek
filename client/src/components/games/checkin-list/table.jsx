import React from 'react';

import smartTable from '../../../hoc/smartTable.jsx';
import TableBody from './RowTemplate.jsx';

import { openModal, submitTeamSearch } from '../../../actions/index';

const headings = [
	{text:'Name',val:'lastName', colSpan:2},
	{text:'#' ,val:'jerseyNumber'},
	{text:'Checked In' ,val:null }
]

export default smartTable({
	headings,
	name: 'TeamList',
	actions: { openModal, submitTeamSearch },
	searchInputHintText: 'Filter team name',
	rowPathname: 'teams.list',
	category: 'name',
})(TableBody);