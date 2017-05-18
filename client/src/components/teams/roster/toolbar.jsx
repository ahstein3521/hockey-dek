import React,{Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Link} from 'react-router-dom';

import SubHeader from 'material-ui/Subheader';


export default class TableToolbar extends Component {

  render() {
   
    const {selected:{seasons, team}} = this.props;
    const {name,hockeyType, season} = team;

    return (
      <Toolbar style={{background:'#ff6d00'}}>
        <ToolbarGroup>
          <ToolbarTitle text={name} />
          <h4 style={{color:'black',marginLeft:6,fontStyle:'italic'}}>
          {"Spring 2017"}
          </h4>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator/>
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <SettingsIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Team Settings" />
            <MenuItem primaryText="Create New Season"/>
            <MenuItem primaryText="Add/Remove Players" />
            <MenuItem primaryText="Download"/>            
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

// //          <IconMenu
//             maxHeight={300}
//             iconButtonElement={<FlatButton label="Archived Seasons"/>}
//           >
//             <SubHeader>Archived Seasons</SubHeader>
//             {
//               seasons.map(({value}, i) => <MenuItem key={i} primaryText={value}/>)
//             }
//           </IconMenu>