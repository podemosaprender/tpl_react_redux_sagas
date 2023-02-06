//INFO: global app store with redux & sagas

import { configureStore, isPlain } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { connectStore } from './navigation';

const SagaMiddleware = createSagaMiddleware();

import reducer from './reducers'
import { rootSaga } from './sagas'

const RootReducer= reducer;

//SEE: https://redux-toolkit.js.org/api/serializabilityMiddleware
const isSerializable = (value) => (value instanceof Date) || isPlain(value);

const store= configureStore({
	devTools: import.meta.env.NODE_ENV !== 'production',

	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false, //A: can't rehydrate, else { isSerializable } //A: no warning for date tipes 
	})
		.concat(SagaMiddleware), //A: actions executed by sagas

	reducer: RootReducer,
	preloadedState: {
		language: 'es'
	 },
});

export const rteRunSaga= (saga) => SagaMiddleware.run(saga);

export default store;

setTimeout(() => {
	rteRunSaga(rootSaga);
	connectStore(store);
}, 0);


