import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

const SuccessSnackbar = props => {
  return (
    <div>
      <Snackbar
        open={props.open}
        message={props.message}
        autoHideDuration={2000}
        onRequestClose={props.handleClose}
      />
    </div>
  );
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