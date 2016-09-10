import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import DevTools from '../containers/DevTools';
import rootSaga from '../actions/sagas.js';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
