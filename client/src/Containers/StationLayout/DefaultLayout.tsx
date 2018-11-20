import { Drawer, Grid, Icon, IconButton, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { Header, InternalLink, Responsive } from 'Components';
import { StationPlayerControllerContainer } from 'Modules';
import * as React from 'react';
import { MdArrowBack as BackIcon, MdMenu as DrawerIcon } from 'react-icons/md';
import { classnames } from 'Themes';
import { styles } from './styles';

export const DefaultLayout = (props: CoreProps) => {
  const { classes, title, stationSongs, stationChatBox, stationSongSearch, stations, drawer, toolbar } = props;
  const homeLink = (
    <div className={classes.drawerBottomSection}>
      <InternalLink href={'/'}>
        <Icon fontSize={'inherit'} className={classes.drawerBottomSectionIcon}>
          <BackIcon />
        </Icon>
        Back to home
      </InternalLink>
    </div>
  );
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
        leftText={
          title && (
            <Typography variant={'h6'} color={'inherit'}>
              {title}
            </Typography>
          )
        }
        additionalRightIcons={toolbar}
      />
      <div className={classes.root}>
        {/* Mobile layout */}
        <Responsive.Mobile>
          <Drawer
            open={drawer.open}
            classes={{ paper: classnames(classes.drawerPaper, classes.drawerPaperMobile) }}
            onClose={drawer.onClose}
          >
            {stations}
            {homeLink}
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
            classes={{ paper: classnames(classes.drawerPaper, classes.drawerPaperTablet) }}
            onClose={drawer.onClose}
          >
            {stations}
            {homeLink}
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
          <Drawer variant="permanent" classes={{ paper: classnames(classes.drawerPaper, classes.drawerPaperDesktop) }}>
            {stations}
            {homeLink}
          </Drawer>
          <Grid container spacing={16} className={classes.container}>
            <Grid item xs={7} className={classes.fullHeight}>
              <Grid container spacing={16} className={classes.fullHeight}>
                <Grid item xs={12} className={classes.searchBoxOtherLayout}>
                  <StationPlayerControllerContainer />
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
            classes={{ paper: classnames(classes.drawerPaper, classes.drawerPaperLargeDesktop) }}
          >
            {stations}
            {homeLink}
          </Drawer>
          <Grid container spacing={16} className={classes.container}>
            <Grid item xs={6} className={classes.fullHeight}>
              <Grid container spacing={16} className={classes.fullHeight}>
                <Grid item xs={12}>
                  <StationPlayerControllerContainer />
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

interface CoreProps extends WithStyles<typeof styles>, Props {}

export default withStyles(styles)(DefaultLayout);

export interface Props extends Identifiable, Styleable {
  title?: React.ReactNode;
  stationSongs: React.ReactNode;
  stationChatBox: React.ReactNode;
  stationSongSearch: React.ReactNode;
  toolbar: React.ReactNode;
  drawer: {
    open: boolean;
    onOpen(): void;
    onClose(): void;
    toggle(): void;
  };
  stations: React.ReactNode;
}
