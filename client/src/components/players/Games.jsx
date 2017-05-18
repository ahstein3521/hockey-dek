import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import TextField from '../forms/input.jsx';
import RaisedButton from 'material-ui/RaisedButton';

const seasons = ['','Winter', 'Spring', 'Summer', 'Fall'];

const formatTeam = (_id) => {
	const id = _id.split('-');
	id.pop();

	return id.join(" ").toUpperCase();

}

const styles = {
	wrapper: {
		margin:10,
		fontSize:'0.9em',
		padding:'5px, 10px',
		textAlign:'left',
		width:'40%'
	},
	table: {
		fontSize:'0.9em',
		width:'100%',
		textAlign:'center'
	}
}

export default class GamesList extends Component{
	render(){
		const {games} = this.props;
		return(
		<div style={{display:'flex', flexFlow:'row wrap'}}> 
			
			{
				games.map(({checkIns,totalPlayed, _id:{year, team, quarter}},i) => (
					<div key={i} style={styles.wrapper}>
						<p>{formatTeam(team)}</p>
						<small>{seasons[quarter]+" "+year}</small>
					<table style={styles.table}>
						<thead>
							<tr>
								<th>Date</th>
								<th>Played</th>
							</tr>
						</thead>
						<tbody>
						{
							checkIns.map(({date, attended}) => (
								<tr key={date}>
									<td>{date}</td>
									<td>{attended? 'Yes' : 'No'}</td>
								</tr>
							))
						}
						</tbody>
						<tfoot>
							<tr>
								<td>{"Total Checkins: "+ totalPlayed}</td>
							</tr>
						</tfoot>	
					</table>
					</div>
					)
				)
			}
		</div>
		)
	}
} 

