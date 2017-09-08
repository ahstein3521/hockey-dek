import React from 'react';

import smartTable from '../../../hoc/smartTable.jsx';
import TableBody from './tbody.jsx';
import { openModal, removePlayerFromGame } from '../../../actions/index';

const headings = [
	{text: 'Sign In', val: null},
	{text:'Name' ,val:'fullName', colSpan: 2},
	{text:'Jersey', val:'jerseyNumber'},
	{text: 'Waiver', val: null},
	{text: 'Payments', val: 'totals.paid'},
	{text: 'Comps', val: 'totals.comped'},
	{text: 'Total', val: 'totals.total'},
	{text: 'Remove', val: null}
]




export const ListOne = smartTable({
		headings,
		actions: { openModal, removePlayerFromGame },
		name: 'tl1',
		rowPathname: 'game.team1.players',
		category: 'fullName',
	})(TableBody)

export const ListTwo = smartTable({
		headings,
		actions: { openModal, removePlayerFromGame },
		name: 'tl2',
		rowPathname: 'game.team2.players',
		category: 'fullName',
	})(TableBody)

