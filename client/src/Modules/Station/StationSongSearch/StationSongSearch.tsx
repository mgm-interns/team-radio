import { Card, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Identifiable } from 'Common';
import { GradientButton, Loading } from 'Components';
import { useLoading } from 'Hooks';
import { withAddSongMutation, WithAddSongMutationProps } from 'RadioGraphql';
import * as React from 'react';
import { MdClear as ClearIcon } from 'react-icons/md';
import { YoutubeHelper } from 'team-radio-shared';
import { useStyles } from './styles';

const StationSongSearch: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { id } = props;

  const youtubeHelper = React.useMemo<YoutubeHelper>(() => new YoutubeHelper(window.fetch), []);
  const [error, setError] = React.useState<string>(null);
  const [url, setUrl] = React.useState<string>('');
  const { loading, toggleLoadingOn, toggleLoadingOff } = useLoading();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const submit = React.useCallback(
    async () => {
      if (!url) return;
      try {
        youtubeHelper.parseVideoUrl(url);
        setError(null);
        toggleLoadingOn();
        await props.mutate({ variables: { url } });
        setUrl('');
        toggleLoadingOff();
        inputRef.current.focus();
      } catch (error) {
        setError(error.message);
      }
    },
    [url]
  );

  const reset = React.useCallback(() => {
    setError(null);
    toggleLoadingOff();
    setUrl('');
  }, []);

  return (
    <Card id={id} className={classes.container}>
      <TextField
        placeholder={'Type youtube URL here'}
        className={classes.textField}
        InputProps={{
          className: classes.input,
          readOnly: loading,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled={loading} onClick={reset}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        InputLabelProps={{ className: classes.inputLabel }}
        FormHelperTextProps={{ error: true }}
        value={url}
        onChange={e => setUrl(e.target.value)}
        inputRef={inputRef}
        helperText={error}
      />
      <GradientButton variant={'contained'} className={classes.button} onClick={submit} disabled={loading}>
        {loading ? <Loading color={'inherit'} size={16} className={classes.loadingContainer} /> : 'Submit'}
      </GradientButton>
    </Card>
  );
};

interface CoreProps extends WithAddSongMutationProps, Props {}

export default withAddSongMutation()(StationSongSearch);

export interface Props extends Identifiable {}
