import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import './styles.css';

class AddLink extends Component {
  static propTypes = {
    video_url: PropTypes.string,
    video_detail: PropTypes.object,
  };

  render() {
    const { video_detail } = this.props;
    return (
      <Grid container className="grid-container add-link-container">
        <Grid item xs={12} className="add-link-title">
          <p>
            <span className="primary-title">ADD TO STATION 1</span>
            <span className="secondary-title">mgm internship 2017</span>
          </p>
        </Grid>
        <Card className="add-link-box">
          <Grid item xs={12}>
            <Grid container className="grid-container">
              <Grid item xs={5} className="add-link-box-left">
                <Grid
                  container
                  className="grid-container"
                  direction="column"
                  justify="space-between"
                >
                  <Grid item xs={12}>
                    <Input
                      className="link-input"
                      placeholder="Add your link..."
                      autoFocus
                      fullWidth
                      multiline
                      rows={3}
                      disableUnderline
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button className="send-btn" raised color="primary">
                      Send <Icon className="send-icon">send</Icon>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={7} className="add-link-box-right">
                <Grid container className="grid-container content">
                  <Grid item xs={2} className="link-img">
                    <img src={video_detail.thumbnail} className="link-img" />
                  </Grid>
                  <Grid item xs={10}>
                    <h3>{video_detail.name}</h3>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default AddLink;
