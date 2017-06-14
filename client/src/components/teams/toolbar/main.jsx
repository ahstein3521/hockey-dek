import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import Search from './search.jsx';

import { rosterTableStyle as css } from '../../../styles/index';

const ToolbarBase = props => {   
  const { location: { state={}, pathname }} = props;
  const { title, subtitle } = state;
  
  return (
    <Toolbar >
      <ToolbarGroup>
        <ToolbarTitle text={title} />
        <h4 style={css.toolbarSubtitle}>{subtitle}</h4>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarSeparator/>
        {map[pathname]}
      </ToolbarGroup>
    </Toolbar>
  );
}

const map = {
  '/teams': <Search/>,
  '/teams/list': <noScript/>,
  '/teams/roster': <noScript/>,
  '/teams/settings': <noScript/>
}

export default ToolbarBase;
