import React, {Component} from 'react';
import Banner from './banner.jsx';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

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
	list.map(({name,_id, hockeyType, ...rest}) => ({
		text:name,
 		teamData:{name, _id, hockeyType, ...rest},
    value:(<MenuItem primaryText={name} secondaryText={hockeyType}/>)
  }))
);


const TeamMenu = ({onNewRequest, teamList}) => (
	<Card style={styles.card}>		
		<Banner/>
		<div style={styles.wrapper}>
			<AutoComplete
				onNewRequest={onNewRequest}
				fullWidth={true}
				floatingLabelText="Team Name:"
				name="name"
				floatingLabelStyle={styles.label}
	  		inputStyle={styles.input}
	  		underlineStyle={styles.input}
	  		filter={AutoComplete.caseInsensitiveFilter}  
				dataSource={getDataSource(teamList)}
			/>
		</div>
	</Card>
)

export default TeamMenu;

