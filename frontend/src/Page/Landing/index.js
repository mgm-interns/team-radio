import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';
import './style.css';
import fixture from '../../Fixture/landing';
import Images from '../../Theme/Images';
import StationSwitcher from '../../Component/StationSwitcher';
import NavBar from '../../Component/NavBar';
import styles from './styles';

const Backdrop = withStyles(styles)(
  class Backdrop extends Component {
    render() {
      const { classes } = this.props;
      return (
        <Grid container xs={12} className={classes.backdropContainer}>
          <Grid container className={classes.backdropForeground}>
            <h3 className={classes.backdropSlogan}>{fixture.slogan}</h3>
            <Grid item xs className={classes.formInput}>
              <TextField
                label="Name your station"
                placeholder="Name your station"
                margin="normal"
                autoFocus={true}
              />
              <Button raised color="primary">
                CREATE
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.backdropImg}>
              <img
                src="https://avante.biz/wp-content/uploads/Music-Wallpaper/Music-Wallpaper-001.jpg"
                alt="Team Radio - Cover"
                className={classes.backdropImg}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    }
  },
);

const PopularStations = withStyles(styles)(
  class PopularStations extends Component {
    render() {
      const { classes } = this.props;

      const mainStation = fixture.stations[0];
      return (
        <Grid container xs={12} className={classes.stationsContainer}>
          <Grid container xs={12} className={classes.stationsWrapper}>
            <Grid container xs={12} className={classes.stationPrimary}>
              <Grid item xs={6}>
                <img
                  src={mainStation.avatar}
                  alt="Most popular station"
                  className={classes.stationPrimaryAvatar}
                />
              </Grid>
              <Grid item xs={6}>
                <h3 className={classes.stationPrimaryTitle}>
                  {mainStation.name}
                </h3>
                <span className={classes.stationPrimarySubTitle}>
                  {mainStation.description}
                </span>
              </Grid>
            </Grid>
            <Grid item xs className={classes.stationSecondary}>
              <StationSwitcher stationList={fixture.stations} />
            </Grid>
          </Grid>
        </Grid>
      );
    }
  },
);

const Section = withStyles(styles)(
  class Section extends Component {
    render() {
      const { classes } = this.props;
      return (
        <Grid container xs={12} className={classes.sectionContainer}>
          <Grid item xs={12} className={classes.sectionDescription}>
            <h3 className={classes.sectionTitle}>Where music happens</h3>
            <span className={classes.sectionSubtitle}>
              When you needs to share music and your whole team can hear it!
            </span>
            <br />
          </Grid>
          <Grid item xs={11}>
            <img
              src={Images.drummer}
              alt="Team Radio"
              className={classes.sectionImages}
            />
          </Grid>
          <Grid item xs={12}>
            <span className={classes.sectionContent}>
              {`Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not
        only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.`}
            </span>
          </Grid>
        </Grid>
      );
    }
  },
);

// const Footer = () => <Grid className="footer_foreground" container xs={12} />;

const LandingPage = () => (
  <Grid container xs={12} style={{ margin: 0 }}>
    <NavBar />
    <Backdrop />
    <PopularStations />
    <Section />
  </Grid>
);

export default LandingPage;
