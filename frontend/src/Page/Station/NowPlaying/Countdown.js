import { Component } from 'react';
import PropTypes from 'prop-types';

const COUNTDOWN_UNIT = 1000;

class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delay: props.delay,
    };

    this.startCountDown = this.startCountDown.bind(this);
  }

  componentDidMount() {
    this.startCountDown();
  }

  countdownInterval = null;
  startCountDown() {
    this.countdownInterval = setInterval(() => {
      if (this.state.delay > 0) {
        this.setState({
          delay: this.state.delay - COUNTDOWN_UNIT,
        });
      } else {
        clearInterval(this.countdownInterval);
      }
    }, COUNTDOWN_UNIT);
  }

  render() {
    return parseInt(this.state.delay / COUNTDOWN_UNIT, 10);
  }
}

CountDown.propTypes = {
  delay: PropTypes.number, // (ms)
};
CountDown.defaultProps = {
  delay: 0,
};

export default CountDown;
