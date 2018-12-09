import {IAction} from "../../shared/types";
import {LOG_OUT, LOGIN_FAILED, LOGIN_SUCCESS} from "./auth.constants";

export function authReducer (state = {}, action: IAction<string>)
{
    switch (action.type)
    {
        case LOGIN_SUCCESS: return {...state, authenticated: true, error: undefined};
        case LOG_OUT: return {...state, authenticated: false, error: undefined};
        case LOGIN_FAILED: return {...state, error: action.payload};
        default: return state;
    }
}

