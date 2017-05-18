import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleMenu, selectView} from '../../actions/index';
import AppBar from 'material-ui/AppBar';
import LeftMenu from './Menu.jsx';

class NavBar extends Component {
  render() {
    return (
      <div>
        <AppBar 
          title="Hockey Dek"
          style={{zIndex:2000, position:'fixed',background:'#002984'}}
          onLeftIconButtonTouchTap={()=> this.props.toggleMenu()}
        />
        <LeftMenu 
          selectView = {this.props.selectView}
          open = {this.props.open}/>            
      </div>      
    );
  }
}

function mapStateToProps(state) {
  const {auth, menu} = state;
  return {
    loggedIn: auth.loggedIn,
    user: auth.user,
    open: menu.open,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleMenu, selectView }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

