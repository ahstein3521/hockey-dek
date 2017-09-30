import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { updatePlayer } from '../../../actions/index';
import { TextField, SelectField, Checkbox } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';



let PlayerForm = props => {
	const { handleSubmit, teamList } = props;
	const waiver = props.initialValues.waiver;
	return(
		<form 
			className='form'
			onSubmit={handleSubmit}>
			<div className='form-row'>
				<Field floatingLabelText="First name" name="firstName" component={TextField} />
				<Field floatingLabelText="Last name"  name="lastName"  component={TextField} />
			</div>
			<div className='form-row'>
				<Field floatingLabelText="Phone number" name="phone" component={TextField} />
				<Field floatingLabelText="Email" name="email" component={TextField} />
			</div>
			<div className='form-row'>
				<Field
					floatingLabelText="Team"
					component={SelectField}
					name='currTeamId'
				>
					<MenuItem
						primaryText='Inactive'
						value='Inactive'
					/>
					{
						teamList.map(team => 
							<MenuItem
								key={team.seasonId}
								primaryText={team.displayName}
								value={team.seasonId}
							/>
						)
					}
				</Field>
				<Field 
					floatingLabelText="Jersey number" 
					type="number" 
					name="jerseyNumber" 
					component={TextField} 
				/>				
			</div>
			<div className='form-row'>
				<Field 
					component={Checkbox}
					disabled={waiver && waiver.format === 'online'}
					label='Waiver signed?' 
					name='waiverSigned'
				/>
			</div>
      <div className="btn-group">       
        <RaisedButton
          type="submit"
          label="Update Player"
          className="form-btn"
          disabled={props.pristine}
          primary={true}
        />
        <RaisedButton
          type="button"
          label="Reset"
          className="form-btn"
          disabled={props.pristine}
          onTouchTap={props.reset}
          secondary={true}
        />           
      </div>
		</form>
	)
}	
	
export default reduxForm({
	form:'playerEditForm',
	onSubmit: updatePlayer,
	enableReinitialize:true,
})(PlayerForm);


