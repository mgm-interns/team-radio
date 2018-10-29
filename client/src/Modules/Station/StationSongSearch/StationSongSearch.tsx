import { Card, TextField, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

class CoreStationSongSearch extends React.Component<CoreStationSongSearch.Props> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes, id } = this.props;
    return (
      <Card id={id} className={classes.container}>
        <TextField
          placeholder={'Type something to search'}
          className={classes.textField}
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.inputLabel }}
        />
      </Card>
    );
  }
}

namespace CoreStationSongSearch {
  export interface Props extends StationSongSearch.Props, WithStyles<typeof styles> {}
}

export const StationSongSearch = withStyles(styles)(CoreStationSongSearch);

export namespace StationSongSearch {
  export interface Props extends Identifiable {}
}
