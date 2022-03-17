import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';
import { RootModule } from 'react-easy-module';
import App from './components/App';
import configStore from './config/store';
import * as serviceWorker from './serviceWorker';
import './custom.scss';

// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';

function configFonts() {
  WebFont.load({
    google: {
      families: ['Inter'],
    },
  });
}

configFonts();

const { store, persistor, history } = configStore();

// Sentry.init({
//   dsn: 'https://56df4cedd6a84f6999828f096f6b2d65@o393924.ingest.sentry.io/5494369',
//   integrations: [new Integrations.BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

ReactDOM.render(
  <Provider store={store}>
    <RootModule persistor={persistor} history={history}>
      <App />
    </RootModule>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
