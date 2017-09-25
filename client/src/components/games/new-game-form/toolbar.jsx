import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';



const ToolbarBase = props => {   
  let { title, subtitle='' } = props;
  

  return (
    <Toolbar >
      <ToolbarGroup>
        <ToolbarTitle text={title} />
        <h4>{subtitle}</h4>
      </ToolbarGroup>
    </Toolbar>
  );
}

export default ToolbarBase;