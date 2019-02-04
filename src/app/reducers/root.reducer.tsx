import {combineReducers} from "redux";
import {reducer as reduxFormReducer} from "redux-form";
import {authReducer} from "../services/auth/auth.reducer";
import {searchReducer} from "../services/search/search.reducer";
import {UIReducer} from "../structure/main/reducers/main.reducer";


export const rootReducer = combineReducers({
    form: reduxFormReducer,
    login: authReducer,
    reports: searchReducer,
    ui: UIReducer
});