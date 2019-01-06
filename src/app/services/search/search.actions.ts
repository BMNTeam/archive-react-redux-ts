import axios from "axios";
import {Action, Dispatch} from "redux";
import {env} from "../../env";
import {SEARCH_CLEAR, SEARCH_ERROR, SEARCH_RESULTS} from "./search.constants";


const search =  (data: Search.ISearchRequest) =>{
    return async (dispatch: Dispatch<Action<string> & {payload?: Models.IReport[]}>) => {
        try {
            const res = await axios.post<Models.IReport[]>(`${env.url}${env.endpoints.search}`, data);
            if(res.status !== 200) { return new Error(); }

            return dispatch({
                payload: res.data,
                type: SEARCH_RESULTS
            });

        } catch (e)
        {
            return dispatch({
                type: SEARCH_ERROR
            });
        }
    }
};

const clearSearch = () => (dispatch: Dispatch<Action<string>>) => dispatch({type: SEARCH_CLEAR});

export {search, clearSearch};