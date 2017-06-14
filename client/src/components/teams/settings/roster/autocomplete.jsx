import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

const getDataSource = (list) => (

	list.map(({firstName, lastName, ...rest},index) => ({
 		text: `${firstName} ${lastName}`,
 		playerData:{firstName, lastName, index, ...rest},
    value:(<MenuItem primaryText={`${firstName} ${lastName}`}/>)
  }))
);

const AddPlayerAutocomplete = props => (
		<AutoComplete
			filter={AutoComplete.caseInsensitiveFilter}
			searchText={props.searchText}
			onUpdateInput={props.handleUpdateInput}
			onNewRequest={props.handleNewRequest}  
			dataSource={getDataSource(props.available)}
			hintText="Find a player to add"
			floatingLabelText="Add player to roster"
			style={{marginBottom:40}}
			fullWidth={true}
			maxSearchResults={3}
		/>
)

export default AddPlayerAutocomplete;