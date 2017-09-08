import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

const getDataSource = (list = []) => {

	return list.map(({firstName, lastName, ...rest},index) => ({
 		text: `${firstName} ${lastName}`,
 		playerData: { firstName, lastName, index, ...rest },
    value: (<MenuItem primaryText={`${firstName} ${lastName}`}/>)
  }))
};

const AddPlayerAutocomplete = props => (
		<AutoComplete
			dataSource={getDataSource(props.available)}
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

export default AddPlayerAutocomplete;