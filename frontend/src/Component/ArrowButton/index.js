import React, {Component} from "react";
import style from './style.css';
import { loadStationPaging } from 'Redux/api/stations/actions';
import { compose } from 'redux';
import {connect} from "react-redux";
import Scrollbar from 'react-scrollbar';

class ArrowButton extends Component {
    constructor(props) {
        super(props);
        this.loadStation = this.loadStation.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
    }

    loadStation() {
        this.props.onClick();
        this.scrollRight();
    }

    scrollRight() {
        this.props.scrollRight();
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

const mapStateToProps = ({ api }) => {
    return {
        stationLoaded: api.stations.stationLoaded,
    }
};

const mapDispatchToProps = dispatch => ({
    onClick: async () => dispatch(await loadStationPaging()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ArrowButton);