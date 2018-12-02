import {applyMiddleware, combineReducers, createStore} from "redux";
import { reducer as reduxFormReducer } from 'redux-form';
import thunk from "redux-thunk";

// TODO: add reducers
const store = createStore(combineReducers({form: reduxFormReducer}),
    applyMiddleware(thunk));

export default store;