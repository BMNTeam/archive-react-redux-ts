import axios from "axios";
import {Dispatch} from "react";
import {env} from "../../env";
import history from '../../shared/history';
import {IAction} from "../../shared/types";
import {ACCESS_TOKEN, LOG_OUT, LOGIN_FAILED, LOGIN_SUCCESS, SET_USER_CREDENTIALS} from "./auth.constants";

interface ILoginDispatch<T> {
    type: string;
    payload: T
}

export interface IAuthentication {
    email: string;
    password: string;
}

export interface IUserInfo
{
    name: string;
    email: string;
    role: string;
}

interface IOAuthToken {
    token_type: string,
    expires_in: number,
    access_token: string,
    refresh_token: string
}

export const loginUser = (data: IAuthentication) => {
    return async (dispatch: Dispatch<ILoginDispatch<string>>) => {
        try {
            const req = {
                client_id: 2,
                client_secret: env.client_secret,
                grant_type: 'password',
                password: data.password,
                username: data.email

            };
            const res = await axios.post<IOAuthToken>(`${env.url}/oauth/token`, req);
            if (res.status !== 200) { throw new Error()};
            dispatch({type: LOGIN_SUCCESS, payload: ""});
            localStorage.setItem(ACCESS_TOKEN, res.data.access_token);

            getUserCredentials(data.email, res.data.access_token);
            history.push('/search');

        } catch (e)
        {
            dispatch({
                payload: 'Invalid email or password',
                type: LOGIN_FAILED
            });
        }

    };
};

const getUserCredentials = (email: string, token: string) => {
    return async (dispatch: Dispatch<ILoginDispatch<IUserInfo>>) => {
         const res =  await axios.get<IUserInfo>(`${env.url}/user/${email}`);
         dispatch({
             payload: res.data,
             type: SET_USER_CREDENTIALS
         });

    };
};

export const logoutUser = () => {
    const action: IAction<string> = {
        type: LOG_OUT
    };
    localStorage.removeItem(ACCESS_TOKEN);
    history.push('/login');
    return action;
};

