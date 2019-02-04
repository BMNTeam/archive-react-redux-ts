import {IAction} from "../../../shared/types";

export interface IUI {
  noContainer: boolean
}
export const CHANGE_CONTAINER = "CHANGE_CONTAINER";

export const changeContainer = () => {
  const action: IAction<string> = {
    type: CHANGE_CONTAINER
  };
  return action;
};