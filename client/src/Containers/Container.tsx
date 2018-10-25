import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { theme } from 'Themes';

export class Container extends React.Component<Container.Props> {
  public render(): React.ReactNode {
    console.log(theme);
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export namespace Container {
  export interface Props {}
}
