import chai from "chai";
import {Provider} from 'react-redux';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import React from "react";
import ReactTestUtils from "react-dom/test-utils";

import check from "../check";
import WeatherDetails from "../../../../src/task-4/components/WeatherDetails";

const mockStore = configureMockStore([ thunk]);
const assert = chai.assert;

const initialState = {
    dayForecast: {},
    selectedDt: null,
};
const loadingState = {
    dayForecast: {
        '1524949200000': {
            data: null,
            loading: true,
            error: false
        }
    },
    selectedDt: 1524949200000
};
const errorState = {
    dayForecast: {
        '1524949200000': {
            data: null,
            loading: false,
            error: true
        }
    },
    selectedDt: 1524949200000
};
const successState = {
    dayForecast: {
        '1524603600000': {
            data: {
                dt: 1524603600000,
                temp: {
                    min: 9.95,
                    max: 10.89
                },
                pressure: 989,
                humidity: 22,
                weather: {
                    description: 'Shower rain',
                    icon: 'shower-rain'
                },
                speed: 12.66,
                deg: 135,
                clouds: 15
            },
            loading: false,
            error: false
        }
    },
    selectedDt: 1524603600000
};

const createComponent = store => ReactTestUtils.renderIntoDocument(
    <Provider store={store}>
        <WeatherDetails />
    </Provider>
);

describe("<WeatherDetails />", () => {

    it("type", () => {
        assert.isTrue(ReactTestUtils.isElementOfType(<WeatherDetails />, WeatherDetails));
    });

    it("structure of empty component", () => {
        const store = mockStore(initialState);
        const component = ReactTestUtils.renderIntoDocument(
            <Provider store={store}>
                <div>
                    <WeatherDetails />
                </div>
            </Provider>
        );

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "div");
        assert.equal(divs.length, 1, `must be empty`);
    });

    it("structure of component when the detail forecast is receiving", () => {
        const store = mockStore(loadingState);
        const component = createComponent(store);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "div");
        check.divDetails(divs);

        check.spinner(divs[0].children[0]);
    });

    it("structure of component when the receiving of forecast is failed", () => {
        const store = mockStore(errorState);
        const component = createComponent(store);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "div");
        check.divDetails(divs);

        check.childrenCount(divs[0], 1);
        const div = divs[0].children[0];
        check.classList(div, ["error"]);
        check.textContent(div, "Error occurred during data fetch. Try to reload");
        check.childrenCount(div, 1);
        check.tagName(div.children[0], "BUTTON");
    });

    it("clicking on reload button", () => {
        const store = mockStore(errorState);
        const component = createComponent(store);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "div");
        const button = divs[0].children[0].children[0];
        store.clearActions();
        ReactTestUtils.Simulate.click(button);
        assert.deepEqual(
            store.getActions(),
            [{
                type: 'FETCH_DAY_START',
                dt: 1524949200000
            }],
            "checking expected actions when clicked on reload button"
        );
    });

    it("structure of component when the forecast was successfuly received", () => {
        const store = mockStore(successState);
        const component = createComponent(store);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "div");
        check.divDetails(divs);

        check.childrenCount(divs[0], 3);
        const b1 = divs[0].children[0];
        check.classList(b1, ["day-name"]);

        check.childrenCount(b1, 2);
        check.tagName(b1.children[0], "DIV");
        check.textContent(b1.children[0], "Wed, Apr 25");

        const img = b1.children[1];
        check.tagName(img, "IMG");
        assert.equal(img.src.substr(-19), "img/shower-rain.png", img.outerHTML);
        assert.equal(img.alt, "Shower rain", img.outerHTML);

        const b2 = divs[0].children[1];
        check.childrenCount(b2, 1);
        check.tagName(b2.children[0], "DL");
        check.childrenCount(b2.children[0], 6);
        check.tagName(b2.children[0].children[0], "DT");
        check.textContent(b2.children[0].children[0], "Min temp");
        check.tagName(b2.children[0].children[1], "DD");
        check.textContent(b2.children[0].children[1], "10℃");
        check.tagName(b2.children[0].children[2], "DT");
        check.textContent(b2.children[0].children[2], "Max temp");
        check.tagName(b2.children[0].children[3], "DD");
        check.textContent(b2.children[0].children[3], "11℃");
        check.tagName(b2.children[0].children[4], "DT");
        check.textContent(b2.children[0].children[4], "Weather");
        check.tagName(b2.children[0].children[5], "DD");
        check.textContent(b2.children[0].children[5], "Shower rain");

        const b3 = divs[0].children[2];
        check.childrenCount(b3, 1);
        check.tagName(b3.children[0], "DL");
        check.childrenCount(b3.children[0], 6);
        check.tagName(b3.children[0].children[0], "DT");
        check.textContent(b3.children[0].children[0], "Wind");
        check.tagName(b3.children[0].children[1], "DD");
        check.textContent(b3.children[0].children[1], "13 m/s");
        check.tagName(b3.children[0].children[2], "DT");
        check.textContent(b3.children[0].children[2], "Humidity");
        check.tagName(b3.children[0].children[3], "DD");
        check.textContent(b3.children[0].children[3], "22%");
        check.tagName(b3.children[0].children[4], "DT");
        check.textContent(b3.children[0].children[4], "Pressure");
        check.tagName(b3.children[0].children[5], "DD");
        check.textContent(b3.children[0].children[5], "989 hpa");
    });

});
