import React from 'react';
import TeamTable from './roster/index.jsx';
import TeamMenu from './search/main.jsx';

import { Route, Link, Switch } from 'react-router-dom';

const TeamPage = () => (
  <div>
    <Route exact path='/team' component={TeamMenu}/>
    <Route path='/team/roster' component={TeamTable}/>
  </div>
)

export default TeamPage;

