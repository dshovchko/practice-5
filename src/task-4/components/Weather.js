import React from "react";
import WeatherDay from "./WeatherDay";
import WeatherDetails from "./WeatherDetails";

import { daysShort } from "../api/data-generator";
import { connect } from "react-redux";

class Weather extends React.Component {
    render() {
        return (
            <div className="weather">
                <ul className="list-inline mx-auto">
                    {daysShort.map(day => (
                        <WeatherDay
                            day={day}
                            key={day.dt} />
                    ))}
                </ul>
                <WeatherDetails />
            </div>
        )
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);