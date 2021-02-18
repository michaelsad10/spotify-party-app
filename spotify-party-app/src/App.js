import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import {
  createMuiTheme,
  ThemeProvider,
  createStyles,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";

function App() {
  const [darkState, setDarkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Navbar />
        <HomePage />
      </div>
    </ThemeProvider>
  );
}

export default App;
