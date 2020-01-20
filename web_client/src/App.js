import React from 'react';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import RegisterView from "./Views/RegisterView";
import LoginView from "./Views/LoginView";
import HomeView from "./Views/HomeView";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ServiceView from "./Views/ServiceView";

function App() {
    const theme = createMuiTheme({});

  return (
      <MuiThemeProvider theme={theme}>
          <Router>
              <Switch>
                  <Route exact path="/">
                      <RegisterView />
                  </Route>
                  <Route path="/login">
                      <LoginView />
                  </Route>
                  <Route path="/home">
                      <HomeView />
                  </Route>
                  <Route path="/service/:name">
                      <ServiceView />
                  </Route>
              </Switch>
          </Router>
      </MuiThemeProvider>
  );
}

export default App;
