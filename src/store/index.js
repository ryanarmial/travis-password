import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'

const logger = store => next => action => {
  // console.log('tested! before action', action)
  next(action)
  // console.log('tested! after action', store.getState())
}

const store = createStore(reducer, applyMiddleware(logger));

export default store;