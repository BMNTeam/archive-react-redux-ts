import {applyMiddleware, createStore} from "redux";
import {Form} from "redux-form";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers/root.reducer";
import {ILogin} from "./structure/login/LoginComponent";

interface ISearchResults {
    error?: boolean;
    data: Models.IReport[]
}
export interface IState {
    form: Form,
    login: ILogin,
    reports: ISearchResults

}
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;