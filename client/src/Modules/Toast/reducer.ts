import * as React from 'react';
import { Action, ActionType } from './actions';

export enum ToastSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export enum ToastDelay {
  INFINITY = 0,
  SHORT = 2500,
  MEDIUM = 5000,
  LONG = 8000
}

export interface Toast {
  id: string;
  message: React.ReactNode;
  delay: ToastDelay;
  severity: ToastSeverity;
}

interface ToastState {
  config: {
    max: number;
  };
  items: Toast[];
}

export const reducer: React.Reducer<ToastState, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.RESET:
      return { ...state, items: [] };

    case ActionType.ADD:
      let newItems = [...state.items];
      if (newItems.length >= state.config.max) {
        let removedIndex = newItems.findIndex(toast => toast.delay !== ToastDelay.INFINITY);
        if (removedIndex === -1) removedIndex = 0;
        newItems = newItems.filter((_, index) => index !== removedIndex);
      }
      newItems.push({
        id: action.payload.id || generateToastUUID(),
        message: action.payload.message,
        delay: action.payload.delay || ToastDelay.MEDIUM,
        severity: action.payload.severity || ToastSeverity.INFO
      });
      return { ...state, items: newItems };

    case ActionType.REMOVE:
      return {
        ...state,
        items: state.items.filter(toast => toast.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export function generateToastUUID() {
  return Math.round(Math.random() * 1000).toString();
}
