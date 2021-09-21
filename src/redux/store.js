import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import infoPedido  from './reducers/pedidoReducer'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  infoPedido,
});


const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
))

export default store;