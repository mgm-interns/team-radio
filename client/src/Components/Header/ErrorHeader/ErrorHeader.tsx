import { AppBar, Icon, IconButton, Toolbar, Tooltip, Typography, withStyles, WithStyles } from '@material-ui/core';
import { RadioErrorConsumer } from 'App';
import { Container } from 'Common';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { MdErrorOutline, MdRefresh } from 'react-icons/md';
import { styles } from './styles';

class ErrorHeader extends React.Component<CoreProps, CoreStates> {
  public render() {
    const { children } = this.props;

    return <RadioErrorConsumer>{({ error }) => (error ? this.renderErrorHeader(error) : children)}</RadioErrorConsumer>;
  }

  private renderErrorHeader = (error: string) => {
    const { classes } = this.props;
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
}

interface CoreProps extends WithStyles<typeof styles>, Props {}
interface CoreStates {}

export default withStyles(styles)(ErrorHeader);

export interface Props extends Container {}
