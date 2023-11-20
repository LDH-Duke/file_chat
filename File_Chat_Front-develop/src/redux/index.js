import {
  conference,
  document,
  participant,
  localUser,
  question,
  userInfo,
  drawing,
  voting,
  drawingTool,
} from './module';
import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { all } from '@redux-saga/core/effects';
import createSagaMiddleware from 'redux-saga';
import { localUserSaga } from './module/localUser';

const reducer = combineReducers({
  conference,
  document,
  participant,
  localUser,
  question,
  userInfo,
  drawing,
  voting,
  drawingTool,
});

export function* rootSaga() {
  yield all([localUserSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
