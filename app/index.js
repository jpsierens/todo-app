import React from 'react';
import fetch from 'isomorphic-fetch';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import './styles/main.scss';

async function getInitialState() {
    try {
        const url = 'http://localhost:3001/todos';
        const response = await fetch(url, { mode: 'cors' });

        return { todos: await response.json() };
    } catch(e) {
        throw e;
    }
}

getInitialState().then((initialState) => {
    const store = configureStore(initialState);
    const history = syncHistoryWithStore(browserHistory, store);

    render(
        <AppContainer>
            <Root store={store} history={history} />
        </AppContainer>,
        document.getElementById('root')
    );

    if (module.hot) {
        module.hot.accept('./containers/Root', () => {
            const NewRoot = require('./containers/Root').default;
            render(
                <AppContainer>
                    <NewRoot store={store} history={history} />
                </AppContainer>,
                document.getElementById('root')
            );
        });
    }
});
