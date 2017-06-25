import React from 'react';

import smartTable from '../../../hoc/smartTable.jsx';
import TableBody from './rowTemplate.jsx';

import { openModal, submitTeamSearch } from '../../../actions/index';

const headings = [
	{text:'Team Name',val:'name', colSpan:2},
	{text:'Hockey Type' ,val:'hockeyType'},
	{text:'Current Season', val:'currentSeason.year'},
	{text:'Edit' ,val:null },
	{text:'Delete' ,val:null }
]

export default smartTable({
	headings,
	name: 'TeamList',
	actions: { openModal, submitTeamSearch },
	searchInputHintText: 'Filter team name',
	rowPathname: 'teams.list',
	category: 'name',
})(TableBody);