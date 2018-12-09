import axious from "axios";
import {ACCESS_TOKEN} from "./auth/auth.constants";

const token = localStorage.getItem(ACCESS_TOKEN);

if (token)
{
    /* tslint:disable:no-string-literal */
    axious.defaults.headers['Authorization'] = `Bearer ${token}`
} else
{
    delete axious.defaults.headers['Authorization'];
}