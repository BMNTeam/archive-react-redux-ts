import createBrowserHistory from "history/createBrowserHistory";
import {applyMiddleware, createStore} from "redux";
import {Form} from "redux-form";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers/root.reducer";
import {ILogin} from "./structure/login/LoginComponent";
import {IUI} from "./structure/main/actions/main.action";

export const history = createBrowserHistory();

export interface IState {
  form: Form,
  login: ILogin,
  reports: Search.ISearchResult,
  ui: IUI

}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;