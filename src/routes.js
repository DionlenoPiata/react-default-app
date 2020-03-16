import React from "react";
import { isAuthenticated, isAuthorized } from "./services/auth-services";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from './pages/Login/index'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={() => <h1>Pagina inicial da aplicação</h1>} />
      <PrivateRoute path="/app" component={() => <h1>Você está logado</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;