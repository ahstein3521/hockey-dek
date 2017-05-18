import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import {NavLink} from 'react-router-dom';
import LogOutModal from '../modals/LogOut.jsx';
import TeamIcon from 'url-loader?limit=20000!../../../icons/team.svg';
import PlayerIcon from 'url-loader?limit=20000!../../../icons/hockey-sticks.svg';
import GameIcon from 'url-loader?limit=20000!../../../icons/hockey-pitch.svg';

import Avatar from 'material-ui/Avatar';

const activeStyle = {
  color:'red', 
  fontWeight:'bolder',
  background:'yellow'
}

const itemStyle={
  display:'flex',
  alignItems:'center',
  padding:15
}

const LeftMenu = props => {
    const {open, dispatch} = props;
 
    return (
      <Drawer open={open}>
        <List style={{marginTop:70}}>
          
          <ListItem 
            primaryText="Teams"
            containerElement={<NavLink to='/roster' activeClassName="active"/>} 
            leftAvatar={<Avatar src={TeamIcon}/>} 
          />
          <ListItem 
            primaryText="Players"
            containerElement={<NavLink to='/players' activeClassName="active"/>} 
            leftAvatar={<Avatar src={PlayerIcon}/>} 
          />
          <ListItem 
            primaryText="Games"  
            leftAvatar={<Avatar src={GameIcon}/>} 
          />          
          <LogOutModal/>
        </List>
      </Drawer>
  );
}

export default LeftMenu