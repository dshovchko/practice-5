import React from "react";
import { connect } from "react-redux";

const WeatherDay = props => {
    return (
        <li className="list-inline-item">
            <div className="day-name">Wed</div>
            <img src="img/rain.png" alt="Raining" />
            <div className="temp">11&#x2103; 19&#x2103;</div>
        </li>
    );
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDay);