import {IAction} from "../../../shared/types";
import {CHANGE_CONTAINER, IUI} from "../actions/main.action";

export function UIReducer (state: IUI = {} as IUI, action: IAction<string>)
{
  switch (action.type)
  {
    case CHANGE_CONTAINER: return {...state, noContainer: !state.noContainer};
    default: return state;
  }
}