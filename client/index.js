import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './src/app.jsx';
import reducers from './src/reducers/index';
import custom from './src/middleware/index';
import theme from './theme';
import './style/main.scss';
injectTapEventPlugin();

const store = createStore(reducers, applyMiddleware(thunk, custom));

const Root = () => {
	return(
		<MuiThemeProvider muiTheme={theme}>
		  <Provider store={store}>
		    <App />
		  </Provider>
		</MuiThemeProvider>
	)
}

ReactDOM.render(<Root/>, document.getElementById('root'))