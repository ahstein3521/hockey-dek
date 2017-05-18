import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import requireAuth from './hoc/requireAuth.jsx';
import handleLoading from './hoc/handleLoading.jsx';
//higher order components used to bootstrap authentications and loading state

import Nav from './components/nav/index.jsx';
import Content from './components/Content.jsx';
import Login from './components/modals/Login.jsx';
import TeamSearch from './components/teams/search/main.jsx';



const App = props => (
	<Router>
		<div>
			<Route path="/login" component={handleLoading(Login)}/>
			<Route path="/" component={handleLoading(requireAuth(Content))}/>
		</div>
	</Router>
);

export default App;
