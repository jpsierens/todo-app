import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import TodosContainer from './containers/TodosContainer';
import About from './components/About';
import TodoDetailContainer from './containers/TodoDetailContainer';
import NotFoundPage from './components/NotFoundPage';

export default (
	<div>
		<Route path="/" component={App}>
			<IndexRoute component={TodosContainer} />
			<Route path="/about" component={About} />
			<Route path="todos/:index" component={TodoDetailContainer} />
		</Route>
		<Route path="*" component={NotFoundPage} />
	</div>
);
