import React from 'react';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';

import MainMap from './MainMap';
import GlobalStyle from './GlobalStyle';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GlobalStyle />

        <MainMap />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
