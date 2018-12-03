import {IAction} from "../../shared/types";

// const LOGIN_USER = "LOGIN_USER";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOG_OUT = "LOG_OUT";

function loginReducer (state = {}, action: IAction<string>)
{
    switch (action.type)
    {
        case LOGIN_SUCCESS: return {...state, authenticated: true};
        case LOG_OUT: return {...state, authenticated: false};
        case LOGIN_FAILED: return {...state, error: action.payload};
        default: return state;
    }
}

export {loginReducer, LOGIN_FAILED, LOGIN_SUCCESS, LOG_OUT}