import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/social/person-add';
import ResetIcon from 'material-ui/svg-icons/action/update';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import {Link} from 'react-router-dom';


const ToolbarBase = props => {   
  let { title, subtitle } = props;
  

  return (
    <Toolbar >
      <ToolbarGroup>
        <ToolbarTitle text={title} />
        <h4>{subtitle}</h4>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarSeparator/>
          <Link to='players/add'>
            <IconButton tooltip="Add A New Player">
            <AddIcon/>
          </IconButton>
          </Link>
          <IconButton onTouchTap={props.reset} tooltip="Start a new game">
            <ResetIcon/>
          </IconButton>
          <IconButton onTouchTap={props.deleteGame} tooltip="Delete this game">
            <DeleteIcon/>
          </IconButton>           
      </ToolbarGroup>
    </Toolbar>
  );
}

export default ToolbarBase;