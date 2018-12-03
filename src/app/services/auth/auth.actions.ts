import axios from "axios";
import {Dispatch} from "react";
import {LOGIN_FAILED, LOGIN_SUCCESS} from "./auth.constants";



interface ILoginDispatch<T> {
    type: string;
    payload: T
}

export interface IAuthentication {
    login: string;
    password: string;
}

export const loginUser = (data: IAuthentication) => async (dispatch: Dispatch<ILoginDispatch<string>>) => {
    try {
        const res = await axios.post<string>('https://jsonplaceholder.com', {data});
        dispatch({type: LOGIN_SUCCESS, payload: ""});
        localStorage.setItem("auth", res.data);
    } catch (e)
    {
        dispatch({
            payload: 'Invalid email or password',
            type: LOGIN_FAILED
        });
    }

};