import React,{Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


import { rosterTableStyle as css } from '../../styles/index';

const ToolbarBase = props => {   
  const { title, subtitle } = props
  return (
    <Toolbar style={css.toolbar}>
      <ToolbarGroup>
        <ToolbarTitle text={title} style={css.toolbarTitle}/>
        <h4 style={css.toolbarSubtitle}>{subtitle}</h4>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarSeparator/>
        {props.children}
      </ToolbarGroup>
    </Toolbar>
  );
}



export default ToolbarBase;
