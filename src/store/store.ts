import { compose, legacy_createStore as createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddlware from 'redux-saga';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?:  typeof compose
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  // storage: storage,
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddlware();

// вывести логи в консоль если мы не в продакшн режиме
// отфильтровать булево значение надо т.к. middleware не может принимать его
const middleWares = [
  process.env.NODE_ENV === 'development' && logger,
  // thunk,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer = 
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer, 
  undefined, 
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);