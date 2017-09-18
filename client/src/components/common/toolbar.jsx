import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import TeamSearch from '../teams/toolbar/search.jsx';
import PlayerMenu from '../players/toolbar/menu.jsx';

import { rosterTableStyle as css } from '../../styles/index';

const ToolbarBase = props => {   
  const { location: { state={}, pathname }} = props;
  let { title = null, subtitle } = state;
  

  return (
    <Toolbar >
      <ToolbarGroup>
        <ToolbarTitle text={title? title : map[pathname].title} />
        <h4 style={css.toolbarSubtitle}>{subtitle}</h4>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarSeparator/>
        {map[pathname] ? map[pathname].component : <noScript/>}
      </ToolbarGroup>
    </Toolbar>
  );
}

const map = {
  '/teams': {
    title: 'Teams',
    component:<TeamSearch/>
  },
  '/teams/roster': <noScript/>,
  '/teams/settings': <noScript/>,
  
  '/players': {
    title:'Players',
    component:<PlayerMenu/>,
  },
  
  
  '/games':{
    title:'GAME',
    component:<noScript/>
  },

}

export default ToolbarBase;
