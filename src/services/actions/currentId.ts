export const SET_CURRENT_ID: 'SET_CURRENT_ID' = 'SET_CURRENT_ID';

export interface ISetCurrentId {
  readonly type: typeof SET_CURRENT_ID;
  payload: string | '';
}

export type TCurrentIdActions = ISetCurrentId;
