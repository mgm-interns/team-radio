import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
// import Button from 'material-ui/Button';
// import Icon from 'material-ui/Icon';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import { withStyles } from 'material-ui/styles';
import styles from './styles';

import { NavBar } from '../../../Component';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      email: '',
      organizationName: '',
    };
    this._handleFullNameChanged = this._handleFullNameChanged.bind(this);
    this._handleEmailChanged = this._handleEmailChanged.bind(this);
    this._handleOrganizationNameChanged = this._handleOrganizationNameChanged.bind(
      this,
    );
    this._submit = this._submit.bind(this);
  }

  _handleFullNameChanged(e) {
    this.setState({ fullName: e.target.value });
  }

  _handleEmailChanged(e) {
    this.setState({ email: e.target.value });
  }

  _handleOrganizationNameChanged(e) {
    this.setState({ organizationName: e.target.value });
  }

  _submit() {}

  render() {
    const { classes, loading, error } = this.props;
    return (
      <div>
        <NavBar />
        <Grid container direction="column" className={classes.container}>
          <Grid container className={classes.foreground}>
            <Grid item xs={10} sm={5} className={classes.formInput}>
              <Card
                raised
                style={{
                  minWidth: 275,
                  padding: '2em',
                }}
              >
                <CardContent>
                  <Grid style={{ paddingBottom: '2em' }}>
                    <Typography type="headline" component="h2">
                      Sign Up
                    </Typography>
                    <Typography component="p">
                      for a free Team Radio account
                    </Typography>
                  </Grid>

                  <FormControl className={classes.textField} error={!!error}>
                    <InputLabel htmlFor="full-name" required>
                      Your full name
                    </InputLabel>
                    <Input
                      id="station-name"
                      placeholder="What's your name?"
                      margin="normal"
                      autoFocus={true}
                      onChange={this._handleFullNameChanged}
                      value={this.state.fullName}
                    />
                    <FormHelperText>
                      {error && error.response && error.response.error.name}
                    </FormHelperText>
                  </FormControl>

                  <FormControl className={classes.textField} error={!!error}>
                    <InputLabel htmlFor="station-name" required>
                      Work email
                    </InputLabel>
                    <Input
                      id="station-name"
                      placeholder="What's your email address?"
                      margin="normal"
                      onChange={this._handleEmailChanged}
                      value={this.state.email}
                    />
                    <FormHelperText>
                      {error && error.response && error.response.error.name}
                    </FormHelperText>
                  </FormControl>

                  <FormControl className={classes.textField} error={!!error}>
                    <InputLabel htmlFor="station-name" required>
                      Your organizations name
                    </InputLabel>
                    <Input
                      id="station-name"
                      placeholder="Where are you coming from?"
                      margin="normal"
                      onChange={this._handleOrganizationNameChanged}
                      value={this.state.organizationName}
                    />
                    <FormHelperText>
                      {error && error.response && error.response.error.name}
                    </FormHelperText>
                  </FormControl>
                </CardContent>
                <CardActions>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      raised
                      color="primary"
                      // onClick={this._submit}
                      className={classes.buttonSend}
                    >
                      Continue
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs className={classes.backgroundImg}>
              <img
                src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-177947.jpg"
                alt="Team Radio - Cover"
                className={classes.backgroundImg}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  addStation: PropTypes.func,
};

export default withStyles(styles)(Register);
