import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

const date = new Date();
const today = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
const tmw = date.setDate(date.getDate()+1)
const tomorrow = new Date(tmw);

export default class DialogExampleSimple extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
        	titleStyle={{textAlign:'center',background:'#FF5722',color:'#212121'}}
          title={`Player suspension form: ${today}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
     		<div style={{width:'70%',margin:'0 auto'}}>
       	<DatePicker
       		fullWidth={true}
       		floatingLabelStyle={{color:'#D84315'}}
       		defaultDate={tomorrow}
       		minDate={tomorrow} 
       		floatingLabelText="Suspend until"
       	/>
       	<TextField
       		floatingLabelStyle={{color:'#D84315'}}
       		fullWidth={true} 
       		multiLine={true}
       		floatingLabelText="Reason"
       	/>
       	</div>
        </Dialog>
      </div>
    );
  }
}