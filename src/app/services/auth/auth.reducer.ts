import {IAction} from "../../shared/types";
import {IUserInfo} from "./auth.actions";
import {LOG_OUT, LOGIN_FAILED, LOGIN_SUCCESS, SET_USER_CREDENTIALS} from "./auth.constants";

export function authReducer (state = {}, action: IAction<string| IUserInfo>)
{
    switch (action.type)
    {
        case LOGIN_SUCCESS: return {...state, authenticated: true, error: undefined};
        case LOG_OUT: return {...state, authenticated: false, error: undefined};
        case LOGIN_FAILED: return {...state, error: action.payload};
        case SET_USER_CREDENTIALS: return {... state, user: action.payload};
        default: return state;
    }
}

