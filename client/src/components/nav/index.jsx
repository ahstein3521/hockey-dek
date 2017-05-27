import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleMenu, selectView} from '../../actions/index';
import AppBar from 'material-ui/AppBar';
import LeftMenu from './Menu.jsx';

import { appBarStyle as style } from '../../styles/index';

class NavBar extends Component {
  
  render() {

    return (
      <div>
        <AppBar 
          title="Hockey Dek"
          style= {style}
          onLeftIconButtonTouchTap={()=> this.props.toggleMenu()}
        />
        
        <LeftMenu 
          open={this.props.open} 
          selected={this.props.selected}
          onSelect={this.props.selectItem}
        />            
      </div>      
    );
  }
}

function mapStateToProps(state) {
  
  const { menu} = state;
  return {
    open: menu.open,
    selected: menu.selected
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleMenu: () => dispatch({type:'TOGGLE_MENU'}),
    selectItem: (item) => dispatch({type: 'SELECT_MENU_ITEM', payload:item})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

