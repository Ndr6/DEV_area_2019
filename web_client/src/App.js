import React from 'react';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import RegisterView from "./Views/RegisterView";
import LoginView from "./Views/LoginView";
import HomeView from "./Views/HomeView";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
    const theme = createMuiTheme({});

  return (
      <ThemeProvider theme={theme}>
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
              </Switch>
          </Router>
      </ThemeProvider>
  );
}

export default App;
