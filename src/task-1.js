import React from "react";
import PropTypes from "prop-types";

export default class Accordion extends React.Component {

    render() {
        return (
            <div>
                <div class="card">
                    <div class="card-header text-white bg-info">
                        Tab 1
                    </div>
                    <div class="card-body">
                        Tab 1 body
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        Tab 2
                    </div>
                    <div class="card-body" hidden>
                        Tab 2 body
                    </div>
                </div>
            </div>
        );
    }
}

Accordion.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string,
            content: PropTypes.string
        })
    )
};
