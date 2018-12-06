import { Button, Card, IconButton, InputAdornment, TextField, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable } from 'Common';
import { Loading } from 'Components';
import { withAddSongMutation, WithAddSongMutationProps } from 'RadioGraphql';
import * as React from 'react';
import { MdClear as ClearIcon } from 'react-icons/md';
import { YoutubeHelper } from 'team-radio-shared';
import { styles } from './styles';

class StationSongSearch extends React.Component<CoreProps, CoreStates> {
  public state: CoreStates = {
    url: '',
    error: null,
    loading: false
  };

  private youtubeHelper = new YoutubeHelper(window.fetch);

  public render() {
    const { classes, id } = this.props;
    return (
      <Card id={id} className={classes.container}>
        <TextField
          placeholder={'Type youtube URL here'}
          className={classes.textField}
          InputProps={{
            className: classes.input,
            readOnly: this.state.loading,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disabled={this.state.loading} onClick={this.reset}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          InputLabelProps={{ className: classes.inputLabel }}
          FormHelperTextProps={{ error: true }}
          value={this.state.url}
          onChange={e => this.setState({ url: e.target.value })}
          helperText={this.state.error}
        />
        <Button
          color={'primary'}
          variant={'contained'}
          className={classes.button}
          onClick={this.submit}
          disabled={this.state.loading}
        >
          {this.state.loading ? <Loading color={'inherit'} size={16} /> : 'Submit'}
        </Button>
      </Card>
    );
  }

  private submit = async () => {
    const { url } = this.state;
    if (!url) return;
    try {
      this.youtubeHelper.parseVideoUrl(url);
      this.setState({ error: null, loading: true });
      await this.props.mutate({ variables: { url } });
      this.setState({ loading: false, url: '', error: null });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  private reset = () => {
    this.setState({
      url: '',
      error: null,
      loading: false
    });
  };
}

interface CoreProps extends WithAddSongMutationProps, WithStyles<typeof styles>, Props {}

interface CoreStates {
  url: string;
  error?: string;
  loading: boolean;
}

export default withAddSongMutation()(withStyles(styles)(StationSongSearch));

export interface Props extends Identifiable {}
