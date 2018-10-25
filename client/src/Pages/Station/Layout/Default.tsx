import { Drawer, Grid, IconButton, WithStyles, withStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { Header, Responsive } from 'Components';
import * as React from 'react';
import { MdMenu as DrawerIcon } from 'react-icons/md';
import { styles } from './styles';

export const CoreDefaultLayout = (props: CoreDefaultLayout.Props) => {
  const { classes, stationSongs, stationChatBox, stationSongSearch, stationPlayer, stations, drawer } = props;
  return (
    <>
      {/* Only display drawer icon on tablet and mobile devices */}
      <Header
        leftIcon={
          <Responsive maxWidth={768}>
            <IconButton color={'inherit'} onClick={drawer.toggle}>
              <DrawerIcon />
            </IconButton>
          </Responsive>
        }
      />
      <div className={classes.root}>
        {/* Mobile layout */}
        <Responsive.Mobile>
          <Drawer
            open={drawer.open}
            classes={{ paper: [classes.drawerPaper, classes.drawerPaperMobile].join(' ').trim() }}
            onClose={drawer.onClose}
          >
            {stations}
          </Drawer>
          <Grid container spacing={16} className={classes.container}>
            <Grid item xs={12} className={classes.fullHeight}>
              {stationSongs}
            </Grid>
            <Grid item xs={12} className={classes.searchBoxLayout}>
              {stationSongSearch}
            </Grid>
            <Grid item xs={12} className={classes.fullHeight}>
              {stationChatBox}
            </Grid>
          </Grid>
        </Responsive.Mobile>
        {/* Tablet layout */}
        <Responsive.Tablet>
          <Drawer
            open={drawer.open}
            classes={{ paper: [classes.drawerPaper, classes.drawerPaperTablet].join(' ').trim() }}
            onClose={drawer.onClose}
          >
            {stations}
          </Drawer>
          <Grid container spacing={16} className={classes.container}>
            <Grid item xs={12} className={classes.fullHeight}>
              <Grid container spacing={16} className={classes.fullHeight}>
                <Grid item xs={12} className={classes.searchBoxOtherLayout}>
                  {stationSongs}
                </Grid>
                <Grid item xs={12} className={classes.searchBoxLayout}>
                  {stationSongSearch}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.fullHeight}>
              {stationChatBox}
            </Grid>
          </Grid>
        </Responsive.Tablet>
        {/* Desktop layout */}
        <Responsive.Desktop>
          <Drawer
            variant="permanent"
            classes={{ paper: [classes.drawerPaper, classes.drawerPaperDesktop].join(' ').trim() }}
          >
            {stations}
          </Drawer>
          <Grid container spacing={16} className={classes.container}>
            <Grid item xs={7} className={classes.fullHeight}>
              <Grid container spacing={16} className={classes.fullHeight}>
                <Grid item xs={12} className={classes.searchBoxOtherLayout}>
                  {stationPlayer}
                </Grid>
                <Grid item xs={12} className={classes.searchBoxLayout}>
                  {stationSongSearch}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5} className={classes.fullHeight}>
              <Grid container spacing={16} className={classes.fullHeight}>
                <Grid item xs={12} className={classes.halfHeight}>
                  {stationSongs}
                </Grid>
                <Grid item xs={12} className={classes.halfHeight}>
                  {stationChatBox}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Responsive.Desktop>
        {/* Large desktop layout */}
        <Responsive.LargeDesktop>
          <Drawer
            variant="permanent"
            classes={{ paper: [classes.drawerPaper, classes.drawerPaperLargeDesktop].join(' ').trim() }}
          >
            {stations}
          </Drawer>
          <Grid container spacing={16} className={classes.container}>
            <Grid item xs={6} className={classes.fullHeight}>
              <Grid container spacing={16} className={classes.fullHeight}>
                <Grid item xs={12}>
                  {stationPlayer}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.fullHeight}>
              <Grid container spacing={16} className={classes.fullHeight}>
                <Grid item xs={6} className={classes.searchBoxOtherLayout}>
                  {stationSongs}
                </Grid>
                <Grid item xs={6} className={classes.searchBoxOtherLayout}>
                  {stationChatBox}
                </Grid>
                <Grid item xs={12} className={classes.searchBoxLayout}>
                  {stationSongSearch}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Responsive.LargeDesktop>
      </div>
    </>
  );
};

namespace CoreDefaultLayout {
  export interface Props extends DefaultLayout.Props, WithStyles<typeof styles> {}
}

export const DefaultLayout: React.ComponentType<DefaultLayout.Props> = withStyles(styles)(CoreDefaultLayout);

export namespace DefaultLayout {
  export interface Props extends Identifiable, Styleable {
    stationPlayer: React.ReactNode;
    stationSongs: React.ReactNode;
    stationChatBox: React.ReactNode;
    stationSongSearch: React.ReactNode;
    drawer: {
      open: boolean;
      onOpen(): void;
      onClose(): void;
      toggle(): void;
    };
    stations: React.ReactNode;
  }
}
