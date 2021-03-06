import './reset.css';
import './fonts.css';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ROUTES } from './constants';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';
import App from './App';
import Draft from './static/pages/Draft';
import TournamentBracket from './static/pages/TournamentBracket';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore, { history } from './redux_setup/store';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

const store = configureStore();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path={`/${ROUTES.DRAFT}`} exact component={Draft} />
          <Route path={`/${ROUTES.TOURNAMENT_BRACKET}`} exact component={TournamentBracket} />
        </Switch>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

serviceWorker.unregister();
