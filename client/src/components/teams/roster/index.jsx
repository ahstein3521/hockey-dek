import React from 'react';
import smartTable from '../../../hoc/table.jsx';
import TableBody from './tbody.jsx';


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
	searchInputHintText: 'Filter players by name',
	rowPathname: 'teams.selected.team.players',
	category: 'lastName',
})(TableBody);
