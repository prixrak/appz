import React from 'react';
import 'normalize.css';
import 'react-loading-skeleton/dist/skeleton.css';
import store from './redux/store';
import AppRouter from './routes/AppRouter';
import { Provider } from 'react-redux';

const App: React.FC = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
