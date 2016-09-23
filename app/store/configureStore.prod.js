import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../actions/sagas.js';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
