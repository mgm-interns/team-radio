import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { FormControl, FormHelperText } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import CircularProgress from "material-ui/Progress/CircularProgress";
import { withStyles } from "material-ui/styles";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import { NavBar } from "../../../Component";
import { fetchUser } from "Redux/api/user";
import { connect } from "react-redux";
import { GoogleLogin, GoogleLogout } from "Component/GoogleForm";
import TextView from "../TextView";

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {}
    };
  }

  // _submit(e) {
  //   e.preventDefault();
  //   if (this._validate()) {
  //     // console.log('submit');
  //     let { email, password } = this.state;
  //     this.props.login({ email, password });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    const response = nextProps.fetchUserResponse;
    const { error } = response;
    console.log(response);
    if (response.error != null) {
      this.setState(prevState => {
        return {
          formErrors: {
            message: error.response.message
          }
        };
      });
    } else if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      this.props.history.push("/");
    }
  }

  render() {
    const { classes, loading, handleSubmit, submitting } = this.props;

    return (
      <div>
        <NavBar />
        <Grid container direction="column" className={classes.container}>
          <Grid container className={classes.foreground}>
            <Grid item xs={11} sm={5} className={classes.cardWrapper}>
              <Card raised className={classes.cardForm}>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <Grid style={{ paddingBottom: "2em" }}>
                      <Typography type="headline" component="h2">
                        Log in
                      </Typography>
                      <Typography component="p">
                        for listening and sharing music
                      </Typography>
                    </Grid>

                    <Field
                      name="email"
                      placeholde="Email"
                      type="text"
                      component={TextView}
                      label="Email"
                    />

                    <Field
                      name="password"
                      placeholder="Password"
                      type="password"
                      component={TextView}
                      label="Password"
                    />

                    <FormHelperText className={classes.error}>
                      {this.state.formErrors.message}
                    </FormHelperText>
                  </CardContent>
                  <CardActions className={classes.cardButton}>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        raised
                        color="primary"
                        type="submit"
                        className={classes.buttonSend}
                      >
                        Log in
                      </Button>
                    )}
                  </CardActions>
                </form>
              </Card>
            </Grid>

            <Grid item xs className={classes.backgroundImg}>
              <img
                src="https://images.unsplash.com/photo-1512692505538-1e7bb8980a77?auto=format&fit=crop&w=2600&q=80"
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: user => {
    dispatch(fetchUser(user));
  }
});

const mapStateToProps = state => {
  // console.log(state.api.user.fetch);
  return {
    fetchUserResponse: state.api.user.fetch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "loginForm",
    validate
  })(withStyles(styles)(Login))
);
