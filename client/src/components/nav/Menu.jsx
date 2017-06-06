import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';

import LogOutIcon from 'material-ui/svg-icons/action/exit-to-app';
import TeamIcon from 'url-loader?limit=20000!../../../icons/team.svg';
import PlayerIcon from 'url-loader?limit=20000!../../../icons/hockey-sticks.svg';
import GameIcon from 'url-loader?limit=20000!../../../icons/hockey-pitch.svg';
import Avatar from 'material-ui/Avatar';

import SvgIcon from 'material-ui/SvgIcon';
import Divider from 'material-ui/Divider';

import { 
  menuStyle,
  menuItemStyle,
  avatarStyle,
  avatarActiveStyle as activeStyle 
} from '../../styles/index';

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom'

const ListItems = [
  {
    link:'/teams',
    svg: TeamIcon,
  },
  {
    link:'/players',
    svg:PlayerIcon,
  },
  {
    link:'/games',
    svg:GameIcon,
  }
];


const matchLink = ({pathname}) => {
  return link => {
    if (pathname === '/') return false;
    const regex = new RegExp(link);
    return regex.test(pathname);
  }
}

const LeftMenu = props => {
    const {open, location, openModal} = props;
    
    const isSubRoute = matchLink( location ); 


    return (
        
        <Drawer open={open} containerStyle={menuStyle}>
          <List style={{marginTop:70}}>
            {
              ListItems.map(({link, svg},i) => (
                <ListItem
                  key={i}
                  style = {menuItemStyle} 
                  primaryText={link.substr(1).toUpperCase()}
                  containerElement={<Link to={link}/>} 
                  leftAvatar={<Avatar style={ isSubRoute(link) ? activeStyle : avatarStyle}  src={svg}/>} 
                />                
                )
              )
            }
            </List>
            <Divider/>
            <List>      
            <ListItem
              primaryText="Log out"
              style = {menuItemStyle} 
              onTouchTap={()=> openModal('logout')}
              leftIcon={<LogOutIcon style={{fill:'black'}}/>}
            />            
          </List>
        </Drawer>
      
  );
}

export default LeftMenu;

 