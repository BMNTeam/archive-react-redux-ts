import {IAction} from "../../shared/types";
import {IState} from "../../store";
import {SEARCH_CLEAR, SEARCH_ERROR, SEARCH_RESULTS} from "./search.constants";

export function searchReducer (state: IState = {} as IState, action: IAction<Models.Client.INewReport[]>)
{
    switch (action.type)
    {
        case SEARCH_RESULTS: return  {...state, error: false, data: action.payload};
        case SEARCH_CLEAR: return {...state, error: false, data: []};
        case SEARCH_ERROR: return {...state, error: true};
        default: return state;
    }
}