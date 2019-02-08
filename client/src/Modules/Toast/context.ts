import * as React from 'react';
import { AddAction, RemoveAction } from './actions';

interface IToastContext {
  add(payload: AddAction['payload']): void;
  remove(payload: RemoveAction['payload']): void;
  reset(): void;
}

export const ToastContext = React.createContext<IToastContext>({
  add: () => ({}),
  remove: () => ({}),
  reset: () => ({})
});
