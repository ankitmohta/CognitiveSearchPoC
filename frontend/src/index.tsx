import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
