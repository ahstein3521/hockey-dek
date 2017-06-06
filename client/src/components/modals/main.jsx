import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { submit } from 'redux-form';

import modalMapping from './map.jsx';
import * as submitActions from '../../actions/index';

class Modal extends Component {

  handleClose = () => {
    this.props.dispatch({type: 'CLOSE_MODAL'});
  };


  getAction = () => {
    const { view, dispatch } = this.props;
    const { onSubmit, reduxFormName } = modalMapping[view];
    
    //HAndle edge case in which ReduxForm component is being used as child content
    //and needs to be submitted remotely via a modal action
    if( reduxFormName ){
      return { handleSubmit:() => dispatch(submit(reduxFormName)) };
    }    

    return  bindActionCreators(
      { handleSubmit: submitActions[onSubmit]},dispatch); 
  };

  render() {
   
    const { view, open, data } = this.props;
  
    const { title, Children } = modalMapping[view];
    
    const handleSubmit = this.getAction().handleSubmit;

    const actions = [
      <RaisedButton
        label="Submit"
        primary={true}
        onTouchTap={()=> handleSubmit(data)}
      />,
      <RaisedButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,      
    ];

    return (
      <div>
        <Dialog
          titleStyle={{textAlign:'center'}}
          title={title}
          
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          {Children? <Children {...data}/> : null}
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps({modal}){
  return {...modal};
}


export default connect(mapStateToProps)(Modal);
