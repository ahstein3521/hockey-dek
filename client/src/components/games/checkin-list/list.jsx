import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Avatar from 'material-ui/Avatar';

const ListExampleSettings = ({team = {}, players, onCheck}) => (

      <List style={{flexGrow:1}}>
        <h3>{team.name}</h3>
        <Divider/>
        {
          players.map((player, i) => 
            <ListItem 
              key={i}
              primaryText={`${player.firstName} ${player.lastName}`}
              secondaryText={player.suspended.length? 'Suspended' : ''}
              // rightAvatar={
              //   <Avatar>{`#${player.jerseyNumber}`}</Avatar>
              // }
              leftCheckbox={
                <Checkbox 
                  onCheck={(evt, isInputChecked)=> onCheck(player._id, isInputChecked)}
                  disabled={player.suspended.length !== 0}
                />
              }
            />
          )
        }
      </List>
  
);

export default ListExampleSettings;