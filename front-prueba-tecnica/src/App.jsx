import { lazy, Suspense, useState } from "react";
import "primeflex/primeflex.css";
import { ThemeContext } from "./contexts/theme-context";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ThemeApp from "./assets/StylesMui";
import { Route, Routes } from "react-router-dom";
// import { UserRenderRoutes } from "./routes/user.routes";
import LoadingPage from "./Pages/NotProtected/LoadingPage";
import { PostRenderRoutes } from "./Routes/post.routes";
import { ProtectedRoute } from "./Utilities/ProtectedRoute";
const Home = lazy(() => import("./Pages/Protected/Home"));
const NotFound = lazy(() => import("./Pages/NotProtected/NotFound"));
function App() {
  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem("dark-mode");
    const browserDefault = isBrowserDefaultDark() ? "dark" : "light";
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <CssBaseline />
        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            backgroundColor: ThemeApp(theme).palette.background.default,
          }}
        >
          <ThemeProvider theme={ThemeApp(theme)}>
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route element={<ProtectedRoute />}> */}
                  {PostRenderRoutes()}
                {/* </Route> */}

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ThemeProvider>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
