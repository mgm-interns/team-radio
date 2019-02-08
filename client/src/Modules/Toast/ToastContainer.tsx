import { Portal } from '@Components';
import * as React from 'react';
import FlipMove from 'react-flip-move';
import { ActionType } from './actions';
import { ToastContext } from './context';
import { reducer } from './reducer';
import { useStyles } from './styles';
import { ToastItem } from './ToastItem';

const ToastContainer: React.FunctionComponent<{}> = props => {
  const classes = useStyles();

  const [state, dispatch] = React.useReducer(reducer, {
    config: { max: 4 },
    items: []
  });

  return (
    <ToastContext.Provider
      value={{
        add(payload) {
          // tslint:disable-next-line object-shorthand-properties-first
          dispatch({ type: ActionType.ADD, payload });
        },
        remove(payload) {
          // tslint:disable-next-line object-shorthand-properties-first
          dispatch({ type: ActionType.REMOVE, payload });
        },
        reset() {
          dispatch({ type: ActionType.RESET });
        }
      }}
    >
      {props.children}
      <Portal>
        <div className={classes.container}>
          <FlipMove typeName={null}>
            {state.items.map(toast => (
              <div key={toast.id}>
                <ToastItem {...toast} onClose={key => dispatch({ type: ActionType.REMOVE, payload: { id: key } })} />
              </div>
            ))}
          </FlipMove>
        </div>
      </Portal>
    </ToastContext.Provider>
  );
};

export default ToastContainer;
