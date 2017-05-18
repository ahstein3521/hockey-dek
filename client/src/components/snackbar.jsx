import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

class SuccessSnackbar extends Component {
  render(){
    return (
      <div>
        <Snackbar
          open={this.props.open}
          message={this.props.message}
          autoHideDuration={2000}
          onRequestClose={this.props.handleClose}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
  const { snackbar : { open, message } } = state;
  return { open, message };
}

function mapDispatchToProps(dispatch){
  const action = { type: 'CLOSE_SNACKBAR' };
  return { handleClose: ()=> dispatch(action) };
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessSnackbar);