import React from 'react';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import RegisterView from "./Components/RegisterView";

function App() {
    const theme = createMuiTheme({

    });

  return (
      <ThemeProvider theme={theme}>
          <RegisterView />
      </ThemeProvider>
  );
}

export default App;
