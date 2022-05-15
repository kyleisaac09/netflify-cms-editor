import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from "styled-components";

import WindowDimensionsProvider, {
  useWindowDimensions
} from "./components/WindowDimensionsProvider";
import { isWindowDown } from "./utils/responsive";
import GlobalStyles from "./components/GlobalStyles";
import Editor from "./components/Editor";
import Toolbar from "./components/Toolbar";
import NavigationMenu from "./components/NavigationMenu";
import MobileNavigationMenu from "./components/MobileNavigationMenu";
import ResponsiveLayout from "./components/ResponsiveLayout";
import { ToastContainer } from "./components/Toast";

import { lightTheme, darkTheme } from "./theme";

const AppWrap = styled.div`
  padding-top: 3.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  @media (display-mode: standalone) {
    padding-top: calc(env(safe-area-inset-top) + 3.5rem);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;
const AppBody = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
  ${({ theme }) => theme.responsive.mediaQueryDown("xs")} {
    flex-direction: column-reverse;
  }
`;
const AppContent = styled.div`
  flex: 1;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
`;

const App = () => {
  // const windowDimensions = useWindowDimensions();
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [isMobile, setIsMobile] = useState(isWindowDown("xs"));
  const handleResize = () => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    setIsMobile(isWindowDown("xs"));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider theme={{ darkMode, ...(darkMode ? darkTheme : lightTheme) }}>
      <WindowDimensionsProvider>
        <AppWrap>
          <GlobalStyles />
          <Toolbar
            title={"New Post"}
            breadcrumbs={[{ label: "Acme News" }, { label: "Posts" }]}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isMobile={isMobile}
          />
          <AppBody isMobile={isMobile}>
            {!isMobile ? (
              <NavigationMenu />
            ) : (
              <MobileNavigationMenu
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            )}
            <AppContent>
              <Editor />
            </AppContent>
          </AppBody>
          <ToastContainer />
        </AppWrap>
      </WindowDimensionsProvider>
    </ThemeProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
