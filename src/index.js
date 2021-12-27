import { Provider } from 'react-redux';

import configureStore from './configureStore';
import App from './App';
import {
  initialize,
  updateCoreInfo,
  updateTheme,
} from 'actions/actionCreators';
import { UpdateUserInfo } from 'lib/user';

const store = configureStore();

const {
  libraries: { React, ReactDOM },
  utilities: {
    onceInitialize,
    onCoreInfoUpdated,
    onThemeUpdated,
    onUserStatusUpdated,
  },
} = NEXUS;

onceInitialize((data) => {
  store.dispatch(initialize(data));
});

onCoreInfoUpdated((coreInfo) => {
  store.dispatch(updateCoreInfo(coreInfo));
});

onThemeUpdated((theme) => {
  store.dispatch(updateTheme(theme));
});

onUserStatusUpdated((userStatus) => {
  //if null == not logged in
  store.dispatch(UpdateUserInfo(userStatus));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
