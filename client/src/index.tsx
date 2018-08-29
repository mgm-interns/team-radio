import * as React from 'react';
import { render } from 'react-dom';
import { Greeting } from './components/App';

render(<Greeting message="Word" />, document.getElementById('root'));

if ((module as any).hot) {
  (module as any).hot.accept();
}
