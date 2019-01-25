import { ThemeType } from 'react-uwp';
import { getTheme } from 'react-uwp/Theme';

export const theme: ThemeType = getTheme({
  accent: '#005ba1',
  desktopBackgroundImage: 'https://gratisography.com/thumbnails/gratisography-74-thumbnail.jpg',
  themeName: 'dark',
  useFluentDesign: true,
})