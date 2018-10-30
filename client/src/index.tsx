import App from 'App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
render();
// Temporary disable hot reloading
// declare const module: any;
// if (module.hot) {
//   module.hot.accept('App', () => render());
// }
