import * as React from 'react';
import { Theme as UwpThemeProvider } from 'react-uwp/Theme';
import ClippedDrawer from '../../containers/ClippedDrawer';
import { theme } from './theme';

class App extends React.Component<{}> {
  public render() {
    return (
      <>
      <UwpThemeProvider theme={theme}>
        <ClippedDrawer/>
      </UwpThemeProvider>
      </>
    );
  }
}

export default App;
