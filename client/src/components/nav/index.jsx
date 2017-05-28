import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleMenu, openModal } from '../../actions/index';
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
          openModal={this.props.openModal}
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
    selectItem: (item) => dispatch({type: 'SELECT_MENU_ITEM', payload:item}),
    openModal: (view,data) => dispatch({type:'OPEN_MODAL', payload: {view, data}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

