import React from 'react';
import smartTable from '../../../hoc/smartTable.jsx';
import TableBody from './rowTemplate.jsx';

import { fetchPlayerDetails } from '../../../actions/index';

const headings = [
	{text:'Name',val:'player.lastName', colSpan:2},
	{text:'#' ,val:'player.jerseyNumber'},
	{text:'Check-ins',val:'checkins'},
	{text:'Paid' ,val:'player.amountPaid'},
	{text:'Comped' ,val:'player.amountComped'},
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
