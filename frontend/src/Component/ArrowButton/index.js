import React, {Component} from "react";
import style from './style.css';
import { loadStationPaging } from 'Redux/api/stations/actions';
import { compose } from 'redux';
import {connect} from "react-redux";

class ArrowButton extends Component {
    constructor(props) {
        super(props);
        this.loadStation = this.loadStation.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
    }

    loadStation() {
        this.props.onClick();
    }

    scrollLeft() {
        this.props.scrollLeft();
    }

    render() {
        return (
            <div>
                <nav className="nav-circlepop">
                    <a className="prev" onClick={this.scrollLeft}>
                        <span className="icon-wrap"></span>
                    </a>
                    <a className="next" onClick={this.loadStation}>
                        <span className="icon-wrap"></span>
                    </a>
                </nav>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(loadStationPaging()),
});

export default compose(
    connect(null, mapDispatchToProps)
)(ArrowButton);