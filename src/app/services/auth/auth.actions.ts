import {Dispatch} from "react";



interface ILoginDispatch<T> {
    type: string;
    payload: T
}

export interface IAuthentication {
    login: string;
    password: string;

}

export const loginUser = (data: IAuthentication) => (dispatch: Dispatch<ILoginDispatch<string>>) => {

    alert(123);
};