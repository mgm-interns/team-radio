import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { RadioTheme, SwitchThemeFunction, ThemeContext, ThemeLocalStorageHelper, themes, ThemeType } from 'Themes';

export class Container extends React.Component<Container.Props, Container.States> {
  constructor(props: Container.Props) {
    super(props);

    this.state = {
      theme: ThemeLocalStorageHelper.get() === ThemeType.LIGHT ? themes.light : themes.dark
    };
  }

  public render(): React.ReactNode {
    console.log(this.state.theme);
    return (
      <ThemeContext.Provider value={{ theme: this.state.theme, switchTheme: this.switchTheme }}>
        <MuiThemeProvider theme={this.state.theme}>
          <CssBaseline />
          {this.props.children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    );
  }

  private switchTheme: SwitchThemeFunction = (desiredTheme?: ThemeType) => {
    let theme = this.state.theme.palette.type === 'light' ? themes.dark : themes.light;
    if (desiredTheme) {
      theme = desiredTheme === ThemeType.LIGHT ? themes.light : themes.dark;
    }
    this.setState({ theme }, () => ThemeLocalStorageHelper.set(this.state.theme.palette.type));
  };
}

export namespace Container {
  export interface Props {}

  export interface States {
    theme: RadioTheme;
  }
}
