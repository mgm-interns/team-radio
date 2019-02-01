import * as React from 'react';
import { ToastDelay, ToastSeverity } from './reducer';

export enum ActionType {
  RESET = 'RESET',
  ADD = 'ADD',
  REMOVE = 'REMOVE'
}

export interface AddAction {
  type: ActionType.ADD;
  payload: {
    message: React.ReactNode;
    id?: string;
    delay?: ToastDelay;
    severity?: ToastSeverity;
  };
}

export interface RemoveAction {
  type: ActionType.REMOVE;
  payload: {
    id: string;
  };
}

export interface ResetAction {
  type: ActionType.RESET;
}

export type Action = AddAction | RemoveAction | ResetAction;
