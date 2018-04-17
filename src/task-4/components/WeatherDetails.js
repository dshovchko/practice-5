import React from "react";
import { days } from "../api/data-generator";
import { connect } from "react-redux";

class WeatherDetails extends React.Component {

    render() {
        const day = days[Object.keys(days)[0]];

        return (
            <div className="details">
                <div className="day-name">
                    <div>Tue, Apr 17</div>
                    <img src="img/rain.png" alt="Raining" />
                </div>
                <div>
                    <dl>
                        <dt>Min temp</dt>
                        <dd>11&#x2103;</dd>

                        <dt>Max Temp</dt>
                        <dd>19&#x2103;</dd>

                        <dt>Weather</dt>
                        <dd>Raining</dd>
                    </dl>
                </div>
                <div>
                    <dl>
                        <dt>Wind</dt>
                        <dd>5 m/s</dd>

                        <dt>Humidity</dt>
                        <dd>56%</dd>

                        <dt>Pressure</dt>
                        <dd>981 hpa</dd>
                    </dl>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDetails);