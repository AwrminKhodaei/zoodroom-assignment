import { createStore, applyMiddleware, compose } from 'redux'
import rootReducter from './reducers'

const initialState = {}


const store = createStore(rootReducter, initialState, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store