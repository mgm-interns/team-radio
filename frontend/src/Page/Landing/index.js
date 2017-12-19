import React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import './style.css';
import fixture from '../../Fixture/landing';
import Images from '../../Theme/Images';
import PopularStations from '../../Component/PopularStations';
import StationSwitcher from '../../Component/StationSwitcher';

const NavBar = () => (
  <Grid className="navbar_container" container>
    <Grid className="logo">
      <img src={fixture.logo} alt="Team Radio" height="50px" />
      <h1 className="navbar_text logoName">{fixture.name}</h1>
    </Grid>
    <Grid className="navigation">
      <Link to="/" className="navbar_text">
        HOME
      </Link>
      <Link to="/station" className="navbar_text">
        STATIONS
      </Link>
      <Link to="/auth/login" className="navbar_text">
        LOGIN
      </Link>
    </Grid>
  </Grid>
);

const Backdrop = () => (
  <Grid className="backdrop_container" container>
    <Grid className="backdrop_foreground">
      <Grid className="something" item xs>
        <h3 className="backdrop_slogan">{fixture.slogan}</h3>
        <Grid>
          <TextField
            label="Name your station"
            placeholder="Name your station"
            margin="normal"
          />
          <Button raised color="primary">
            CREATE
          </Button>
        </Grid>
      </Grid>
      <img
        src="https://avante.biz/wp-content/uploads/Music-Wallpaper/Music-Wallpaper-001.jpg"
        alt="Team Radio - Cover"
      />
    </Grid>
  </Grid>
);

const Section = () => (
  <Grid className="section_container" container>
    <Grid className="section_foreground" item xs={12}>
      <Grid className="section_description" item xs>
        <h3 className="section_slogan">Where music happens</h3>
        <span className="section_smalltext subtitle">
          When you needs to share music and your whole team can hear it!
        </span>
        <span className="section_content">
          {`Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.`}
        </span>
      </Grid>
      <Grid item xs>
        <img
          src={Images.drummer}
          alt="Team Radio"
          className="section_largeIcon"
        />
      </Grid>
    </Grid>
  </Grid>
);

const Footer = () => <Grid className="footer_foreground" container />;

const LandingPage = () => (
  <Grid container>
    <NavBar />
    <Backdrop />
    <PopularStations stationList={fixture.stations} />
    {/* <StationSwitcher stationList={fixture.stations}/> */}
    <Section />
    <Footer />
  </Grid>
);

export default LandingPage;
