import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import TodosContainer from './containers/TodosContainer';
import About from './components/About';
import TodoDetailContainer from './containers/TodoDetailContainer';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={TodosContainer} />
		<Route path="/about" component={About} />
		<Route path="/:index" component={TodoDetailContainer} />
	</Route>
);
