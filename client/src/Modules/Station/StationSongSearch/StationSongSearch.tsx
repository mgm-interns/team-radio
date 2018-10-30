import { Card, TextField, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

class StationSongSearch extends React.Component<CoreProps> {
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

interface CoreProps extends WithStyles<typeof styles>, Props {}

export default withStyles(styles)(StationSongSearch);

export interface Props extends Identifiable {}
