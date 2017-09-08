import React from 'react';

import { Field } from 'redux-form';
import {  TextField } from 'redux-form-material-ui';
import AutoComplete from 'material-ui/AutoComplete';
const form = 'ImportPlayerForm';


const AddPlayerAutocomplete = props => (
		<AutoComplete
			dataSource={props.players}
			filter={AutoComplete.caseInsensitiveFilter}
			floatingLabelText="Add player to roster"
			fullWidth={true}
			hintText="Find a player to add"
			maxSearchResults={3}
			onUpdateInput={props.handleUpdateInput}
			onNewRequest={props.handleNewRequest}  
			searchText={props.searchText}
			style={{marginBottom:40}}
		/>
)

const renderList = ({fields, ...props}) => (
		<span>
			<Field 
				component={AutoComplete}
				name='addPlayers'
				onNewRequest={player => fields.push(player)}
				floatingLabelText='Add a player'
				dataSource={props.availablePlayers}
				dataSourceConfig={{text:'fullName', value:'_id'}}
			/>
			{	
				fields.map((player,i) => 
					<div>
					<Field
						key={i}
						component={TextField}
						readOnly={true}
						type='text'
						name={`${player}.fullName`}
					/>
					<button 
						onClick={()=> 
							fields.remove(i);
							props.arrayPush(form, 'availablePlayers', props.team[i]);
							}
						}>
						Remove
					</button>
					</div>
				)
			}
	</span>
)	

export default renderList;