import {combineReducers} from "redux";
import {reducer as reduxFormReducer} from "redux-form";
import {authReducer} from "../services/auth/auth.reducer";


export const rootReducer = combineReducers({
    form: reduxFormReducer,
    login: authReducer
});