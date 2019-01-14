import {applyMiddleware, createStore} from "redux";
import {Form} from "redux-form";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers/root.reducer";
import {ILogin} from "./structure/login/LoginComponent";


export interface IState {
    form: Form,
    login: ILogin,
    reports: Search.ISearchResult

}
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;