import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Todos from './containers/Todos';
import About from './components/About';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Todos} />
		<Route path="/about" component={About} />
	</Route>
);
