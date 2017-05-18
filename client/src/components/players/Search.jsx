import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import { Card } from 'material-ui/Card';

const styles = {
	card:{
		marginBottom:30, 
		background:'#3f51b5'
	},
	wrapper:{
		width:'70%', 
		margin:'0 auto'
	},
	label:{
		color:'white', 
		fontSize:'1.3em'
	},
	input:{
		color:'white',
		fontSize:'1.5em'
	}
}

const getDataSource = (list) => (

	list.map(({firstName, lastName, ...rest}) => ({
 		text: `${firstName} ${lastName}`,
 		playerData:{firstName, lastName, ...rest},
    value:(<MenuItem primaryText={`${firstName} ${lastName}`}/>)
  }))
);


const PlayerMenu = ({onNewRequest, playerList}) => (
	<Card style={styles.card}>		
		<div style={styles.wrapper}>
			<AutoComplete
				onNewRequest={onNewRequest}
				fullWidth={true}
				floatingLabelText="Player Name:"
				name="name"
				maxSearchResults={6}
				floatingLabelStyle={styles.label}
	  		inputStyle={styles.input}
	  		underlineStyle={styles.input}
	  		filter={AutoComplete.caseInsensitiveFilter}  
				dataSource={getDataSource(playerList)}
			/>
		</div>
	</Card>
)

export default PlayerMenu;
