import { applyMiddleware, createStore,compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './Reducers/index'
const initialstate={}
const middleware=[thunk]
const store=createStore(
    rootReducer,
    initialstate,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()
    )

)
    
export default store
