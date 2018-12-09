import {applyMiddleware, createStore} from "redux";
import {Form} from "redux-form";
import thunk from "redux-thunk";
import {ILogin} from "./components/login/LoginComponent";
import {rootReducer} from "./reducers/root.reducer";


export interface IState {
    form: Form,
    login: ILogin

}
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;