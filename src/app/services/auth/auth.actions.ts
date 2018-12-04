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

export const loginUser = (data: IAuthentication) => {
    return async (dispatch: Dispatch<ILoginDispatch<string>>) => {
        try {
            const res = await axios.post<{id: string}>('https://jsonplaceholder.typicode.com/posts', {data});
            dispatch({type: LOGIN_SUCCESS, payload: ""});
            localStorage.setItem("auth", res.data.id);
            throw(new Error())
        } catch (e)
        {
            dispatch({
                payload: 'Invalid email or password',
                type: LOGIN_FAILED
            });
        }

    };
}