import { Identifiable } from '@Common';
import { GradientButton, Loading } from '@Components';
import { useToggle } from '@Hooks';
import { Card, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { ToastContext, ToastSeverity } from '@Modules';
import { AddSongMutation } from '@RadioGraphql';
import * as React from 'react';
import { MdClear as ClearIcon } from 'react-icons/md';
import { YoutubeHelper } from 'team-radio-shared';
import { useStyles } from './styles';

const StationSongSearch: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { id } = props;

  const youtubeHelper = React.useMemo<YoutubeHelper>(() => new YoutubeHelper(window.fetch), []);
  const [error, setError] = React.useState<string | null>(null);
  const [url, setUrl] = React.useState<string>('');
  const [loading, loadingAction] = useToggle();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addSong = AddSongMutation.useMutation();
  const toastContext = React.useContext(ToastContext);

  const submit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!url) return;
      try {
        youtubeHelper.parseVideoUrl(url);
        setError(null);
        loadingAction.toggleOn();
        await addSong({ variables: { url } });
        setUrl('');
        loadingAction.toggleOff();
        if (inputRef.current) inputRef.current.focus();
      } catch (error) {
        setError(error.message);
        toastContext.add({ message: error.message, severity: ToastSeverity.ERROR });
      }
    },
    [url]
  );

  const reset = React.useCallback(() => {
    setError(null);
    loadingAction.toggleOff();
    setUrl('');
  }, []);

  return (
    <Card id={id} className={classes.container}>
      <form onSubmit={submit}>
        <TextField
          placeholder={'Type youtube URL here'}
          className={classes.textField}
          InputProps={{
            className: classes.input,
            readOnly: loading,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={reset}>
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
          autoFocus
        />
        <GradientButton variant={'contained'} className={classes.button} onClick={submit} disabled={loading}>
          {loading ? <Loading color={'inherit'} size={16} className={classes.loadingContainer} /> : 'Submit'}
        </GradientButton>
      </form>
    </Card>
  );
};

interface CoreProps extends Props {}

export default StationSongSearch;

export interface Props extends Identifiable {}
