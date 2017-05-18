import React, {Component} from 'react';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import GoogleIcon from 'url-loader?limit=20000!../../../icons/google-plus.svg';
import Avatar from 'material-ui/Avatar';

const Button = () => (
  <a href='/auth/google'>
    <RaisedButton 
      label='Log In'
      labelStyle={{color:'#A7FFEB'}} 
      backgroundColor="#00695C"
    />
  </a>
);

const LoginModal = () => (
  <div>
    <Dialog
      title="Log in with your Google+ account"
      titleStyle={{textAlign:'center'}}
      actions={<Button/>}
      icon = {<Avatar src={GoogleIcon}/>}
      modal={true}
      open={true}
    >
    </Dialog>
  </div>
);

export default LoginModal;
