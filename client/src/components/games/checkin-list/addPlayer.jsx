import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import {List, ListItem} from 'material-ui/List';

const format = n => '$' + (n/100).toFixed(2);

const TableBanner = props => {
	
	return (
		<div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
			<ul style={{listStyle:'none'}}>
				<li>
					<p><b>Total Payments: </b>
					{format(props.team.totalPaid)}</p>
				</li>
				<li>
					<p><b>Total Comps: </b>
					{format(props.team.totalComped)}</p>
				</li>
			</ul>
			<div style={{marginRight:15}}>
			<AutoComplete
				dataSource={props.availablePlayers}
				dataSourceConfig={{text:'fullName', value: '_id'}}
				onNewRequest={props.addPlayer}
				onUpdateInput={props.updateInput}
				hintText='Add a player'
				maxSearchResults={5}
				filter={AutoComplete.caseInsensitiveFilter}
				searchText={props.searchText}
				name='AddPlayer'
			/>
			</div>
		</div>
	)
}

export default TableBanner;