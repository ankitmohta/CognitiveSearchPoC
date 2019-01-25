import * as React from 'react'
import { Theme as UwpThemeProvider } from 'react-uwp/Theme';
import { theme } from '../../../components/App/theme';
export const withTheme = (children: string | JSX.Element) => <UwpThemeProvider theme={theme}>{children}</UwpThemeProvider>