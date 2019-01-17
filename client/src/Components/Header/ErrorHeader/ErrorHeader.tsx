import { AppBar, Icon, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { RadioErrorContext } from 'App';
import { Container } from 'Common';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { MdErrorOutline, MdRefresh } from 'react-icons/md';
import { useStyles } from './styles';

const ErrorHeader: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const { error } = React.useContext(RadioErrorContext);

  const { children } = props;
  if (!error) return children as React.ReactElement<any>;

  return (
    <AppBar position={'static'}>
      <Toolbar color={'error'} className={classes.errorHeader}>
        <div className={classes.errorLeft}>
          <Icon color={'inherit'} className={classes.errorIcon}>
            <MdErrorOutline />
          </Icon>
          <Typography color={'inherit'} variant={'subtitle1'}>
            Something went wrong! You may want to refresh the page or hit the reload button on the right.
          </Typography>
        </div>
        <div className={classes.errorRight}>
          <ApolloConsumer>
            {client => (
              <IconButton color={'inherit'} onClick={client.resetStore}>
                <Tooltip title={'Reload the page'}>
                  <MdRefresh />
                </Tooltip>
              </IconButton>
            )}
          </ApolloConsumer>
        </div>
      </Toolbar>
    </AppBar>
  );
};

interface CoreProps extends Props {}

export default ErrorHeader;

export interface Props extends Container {}
