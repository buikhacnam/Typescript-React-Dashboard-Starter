import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers/rootReducer'

let middleware = [thunk, logger]

if(process.env.NODE_ENV === 'production'){
    middleware = [thunk]
}

const store = createStore(reducers, compose(applyMiddleware(...middleware)))

export default store
