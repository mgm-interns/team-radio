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
            <Grid item xs className={classes.wrapper}>
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
        </Grid>
      );
    }
  },
);

// const PopularStations = () => {
//   const stations = [];
//   fixture.stations.map((station, index) =>
//     stations.push(
//       <Grid key={index} className="station_item" item>
//         <img
//           src={station.avatar}
//           alt=""
//           className="stations_secondary_avatar"
//         />
//         <h1 className="station-text--title">{station.name}</h1>
//         <span className="subtitle">{station.describe}</span>
//       </Grid>,
//     ),
//   );

//   const mainStation = fixture.stations[0];
//   return (
//     <Grid className="stations_container" container xs={12}>
//       <Grid className="stations_wrapper" item xs={12}>
//         <Grid className="stations_primary" item xs>
//           <img src={mainStation.avatar} alt="" width="200" height="200" />
//           <h1 className="station-text--title">{mainStation.name}</h1>
//           <span className="subtitle">{mainStation.describe}</span>
//         </Grid>
//         <Grid className="stations_secondary" item xs>
//           <StationSwitcher stationList={fixture.stations} />
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// const Section = () => (
//   <Grid className="section_container" container xs={12}>
//     <Grid className="section_foreground" item xs={12}>
//       <Grid className="section_description" item xs>
//         <h3 className="section_slogan">Where music happens</h3>
//         <span className="section_smalltext subtitle">
//           When you needs to share music and your whole team can hear it!
//         </span>
//         <span className="section_content">
//           {`Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//             ever since the 1500s, when an unknown printer took a galley of type
//             and scrambled it to make a type specimen book. It has survived not
//             only five centuries, but also the leap into electronic typesetting,
//             remaining essentially unchanged.`}
//         </span>
//       </Grid>
//       <Grid item xs>
//         <img
//           src={Images.drummer}
//           alt="Team Radio"
//           className="section_largeIcon"
//         />
//       </Grid>
//     </Grid>
//   </Grid>
// );

// const Footer = () => <Grid className="footer_foreground" container xs={12} />;

const LandingPage = () => (
  <Grid container xs={12} style={{ margin: 0 }}>
    <NavBar />
    <Backdrop />
  </Grid>
);

export default LandingPage;
