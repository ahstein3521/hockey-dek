import React from 'react';
import smartTable from '../../../hoc/smartTable.jsx';
import TableBody from './rowTemplate.jsx';

import { fetchPlayerDetails } from '../../../actions/index';

const headings = [
	{text:'Name',val:'lastName', colSpan:2},
	{text:'#' ,val:'jerseyNumber'},
	{text:'Check-ins',val:'checkIns'},
	{text:'Paid' ,val:'amountPaid'},
	{text:'Comped' ,val:'amountComped'},
	{text:'Suspended' ,val:null },
	{text:'Waiver' ,val:null }
];


export default smartTable({
	headings,
	name: 'TeamRoster',
	actions: { fetchPlayerDetails },
	searchInputHintText: 'Filter players by name',
	rowPathname: 'teams.selected.team.players',
	category: 'lastName',
})(TableBody);
