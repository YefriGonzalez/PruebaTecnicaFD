import { createTheme } from "@mui/material";
import { useMemo } from "react";

const ThemeApp = (darkMode) => {
  return useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode,
          primary: {
            main: darkMode === "light" ? "#004081" : "#fff",
          },
          secondary: {
            main: darkMode === "light" ? "#3b3b3b" : "#666666",
          },
          success: {
            main: darkMode === "light" ? "#1d772b" : "#28A33B",
          },
          error: {
            main: darkMode === "light" ? "#b10303" : "#db0303",
          },
          warning: {
            main: darkMode === "light" ? "#ad6602" : "#db7f00",
          },
          info: {
            main: darkMode === "light" ? "#445da8" : "#506FC8",
          },
          white: {
            main: "#ffffff",
            light: "#ffffff",
            dark: "#ffffff",
          },
          background: {
            default: darkMode === "light" ? "#ECECEC" : "#3b3b3b",
          },
        },
        typography: {
          fontFamily: `"Gotham Normal", sans-serif`,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
        },
      }),
    [darkMode]
  );
};

export default ThemeApp;