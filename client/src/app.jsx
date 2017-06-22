import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import requireAuth from './hoc/requireAuth.jsx';

import Content from './components/Content.jsx';
import Login from './components/modals/Login.jsx';




const App = () => (
	<Router>
		<div>
			<Route path="/login" component={Login} />
			<Route path="/" component={requireAuth(Content)} />
		</div>
	</Router>
);

export default App;
