import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Authorize, PrivateRoute } from '../modules/auth/containers';
import AppError from './AppError';
import { E404Page, LogoutPage, SignInPage } from './Pages';

const Admin = Authorize(['admin']);

const MainApp: React.FC = () => (
  <Fragment>
    <AppError />
    <Switch>
      <Route exact path="/login" component={SignInPage} />
      <Route exact path="/logout" component={LogoutPage} />

      {/* <PrivateRoute key="menu-main-1" exact path="/(url)?" component={Admin(ComponentPage)} /> */}
      <Route path="/*" component={E404Page} />
    </Switch>
  </Fragment>
);

export default MainApp;
