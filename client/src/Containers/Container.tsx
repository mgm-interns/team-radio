import { Container as CommonContainer } from '@Common';
import { useLocalStorage } from '@Hooks';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { THEME_LOCAL_STORAGE_KEY, ThemeContext, themes, ThemeType } from '@Themes';
import * as React from 'react';

const Container: React.FunctionComponent<CoreProps> = props => {
  const [theme, setTheme] = useLocalStorage<ThemeType>(THEME_LOCAL_STORAGE_KEY, ThemeType.LIGHT);
  const switchTheme = React.useCallback(
    (desiredTheme?: ThemeType) => {
      if (!desiredTheme) {
        setTheme(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);
      } else {
        setTheme(desiredTheme);
      }
    },
    [theme]
  );

  const muiTheme = React.useMemo(() => (theme === ThemeType.LIGHT ? themes.light : themes.dark), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

interface CoreProps extends Props {}

export default Container;

export interface Props extends CommonContainer {}
