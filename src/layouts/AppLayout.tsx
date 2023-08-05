import React from "react";
import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components";
import NavbarComponent from "../components/layout/NavbarComponent";
import { Toaster } from "react-hot-toast";

type GlobalStyleProps = DefaultTheme;

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    margin: 0;
    padding: 0;
    background: #111;
    color: #fff;
    font-family: 'Noto Sans', sans-serif;
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.8; /* Added transparency */
  background: linear-gradient(
    45deg,
    rgba(32, 35, 42, 0.8),
    rgba(52, 58, 64, 0.8),
    rgba(32, 35, 42, 0.8),
    rgba(32, 35, 42, 0.8)
  ); /* Adjust these colors to your liking */
  background-size: 400% 400%;
  animation: gradientAnimation 10s ease infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const ChildrenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #a78295;
  box-sizing: border-box;
  height: calc(100vh - 80px);
`;
const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={{}}>
      <Toaster position="bottom-center" />
      <GlobalStyle />
      <BackgroundContainer />
      <NavbarComponent />
      <ChildrenContainer>{children}</ChildrenContainer>
    </ThemeProvider>
  );
};

export default AppLayout;
