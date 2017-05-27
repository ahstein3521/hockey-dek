import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '../forms/input.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

const rowStyle = {
	display:'flex',
	justifyContent:'space-around'
}

const formStyle={
	width:'70%',
	margin:'10px auto'
};

class PlayerForm extends Component{
	
	onSubmit = (body) => {
		this.props.updatePlayer(body);
	}

	componentWillMount(){
		const {player , initialize} = this.props;
		initialize(player);
	}

	componentWillReceiveProps(nextProps){
		const {player , initialize} = this.props;
		if(nextProps.player != player){
			initialize(nextProps.player);
		}
	}


	render(){
		const {handleSubmit} = this.props;
		
		return(
			<form 
				style={formStyle}
				onSubmit={handleSubmit(this.onSubmit)}>
				<div style={rowStyle}>
					<Field label="First name" name="firstName" component={TextField} />
					<Field label="Last name" name="lastName" component={TextField} />
				</div>
				<div style={rowStyle}>
					<Field label="Phone number" name="phone" component={TextField} />
					<Field label="Email" name="email" component={TextField} />
				</div>
				<div style={rowStyle}>
					<Field label="Jersey number" type="number" name="jerseyNumber" component={TextField} />
				</div>

				<RaisedButton 
					fullWidth={true}
					style={{marginTop:40}}
					label="Update Player's Info"
					labelStyle={{color:'#F5F5F5'}}
					backgroundColor="#546E7A"
					type="submit"
				/>
			</form>
		)
	}	
}

	
PlayerForm = reduxForm({form:'playerEditForm'})(PlayerForm);

export default PlayerForm;


