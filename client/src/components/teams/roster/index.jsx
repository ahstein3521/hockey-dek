import React from 'react';
import smartTable from '../../../hoc/smartTable.jsx';
import TableBody from './rowTemplate.jsx';

import { selectPlayer } from '../../../actions/index';

const headings = [
	{text:'Name',val:'lastName', colSpan:2},
	{text:'#' ,val:'jerseyNumber'},
	{text:'Check-ins',val:'checkins'},
	{text:'Paid' ,val:'paid'},
	{text:'Comped' ,val:'comped'},
	{text:'Suspended' ,val:null },
	{text:'Waiver' ,val:null }
];


export default smartTable({
	headings,
	name: 'TeamRoster',
	actions: { selectPlayer },
	searchInputHintText: 'Filter players by name',
	rowPathname: 'teams.selected.roster',
	category: 'lastName',
})(TableBody);
