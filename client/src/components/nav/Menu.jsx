import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';

import LogOutModal from '../modals/LogOut.jsx';
import TeamIcon from 'url-loader?limit=20000!../../../icons/team.svg';
import PlayerIcon from 'url-loader?limit=20000!../../../icons/hockey-sticks.svg';
import GameIcon from 'url-loader?limit=20000!../../../icons/hockey-pitch.svg';
import Avatar from 'material-ui/Avatar';

import { 
  menuStyle,
  menuItemStyle as style,
  menuItemActiveStyle as activeStyle 
} from '../../styles/index';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const LeftMenu = props => {
    const {open} = props;
    return (
      
        <Drawer open={open} containerStyle={menuStyle}>
          <List style={{marginTop:70}}>
            
            <ListItem
              onClick={() => props.onSelect('/roster')}
              style = {props.selected=='/roster'? activeStyle : style} 
              primaryText="Teams"
              containerElement={<Link to='/team'/>} 
              // leftAvatar={<Avatar src={TeamIcon}/>} 
            />
            <ListItem
              onClick={() => props.onSelect('/players')}
              style = {props.selected=='/players'? activeStyle : style}              
              primaryText="Players"
              containerElement={<Link to='/players'/>} 
              // leftAvatar={<Avatar src={PlayerIcon}/>} 
            />
            <ListItem 
              primaryText="Games"  
              style = {style}
              // leftAvatar={<Avatar src={GameIcon}/>} 
            />          
            <LogOutModal/>
          </List>
        </Drawer>
      
  );
}

export default LeftMenu