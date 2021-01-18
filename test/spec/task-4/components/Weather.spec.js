import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import check from '../check';
import Weather from '../../../../src/task-4/components/Weather';

const mockStore = configureMockStore([ thunk]);

const initialState = {
    dayForecast: {},
    selectedDt: null,
    weekForecast: [],
    weekLoading: false,
    weekError: false
};
const loadingState = {
    dayForecast: {},
    selectedDt: null,
    weekForecast: [],
    weekLoading: true,
    weekError: false
};
const errorState = {
    dayForecast: {},
    selectedDt: null,
    weekForecast: [],
    weekLoading: false,
    weekError: true
};
const successState = {
    dayForecast: {},
    selectedDt: null,
    weekForecast: [
        {
            dt: 1524603600000,
            temp: {
                min: -2.47,
                max: 15.52
            },
            weather: {
                description: 'Misty',
                icon: 'mist'
            }
        },
        {
            dt: 1524690000000,
            temp: {
                min: 8.58,
                max: 11.98
            },
            weather: {
                description: 'Broken clouds',
                icon: 'broken-clouds'
            }
        }
    ],
    weekLoading: false,
    weekError: false
};

const createComponent = store => ReactTestUtils.renderIntoDocument(
    <Provider store={store}>
        <Weather />
    </Provider>
);

describe('<Weather />', () => {

    it('type', () => {
        expect(ReactTestUtils.isElementOfType(<Weather />, Weather)).toBeTruthy();
    });

    it('structure of empty component', () => {
        const store = mockStore(initialState);
        const component = createComponent(store);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        check.divWeather(divs);

        check.childrenCount(divs[0], 2);
        const ul = divs[0].children[0];
        check.classList(ul, ['list-inline', 'mx-auto']);
    });

    it('autoload of data when component was rendered', () => {
        const store = mockStore(initialState);

        createComponent(store);
        expect(store.getActions()).toEqual([{ type: 'FETCH_WEEK_START' }]);
    });

    it('structure of component when the forecast is receiving', () => {
        const store = mockStore(loadingState);
        const component = createComponent(store);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        check.divWeather(divs);

        check.childrenCount(divs[0], 1);
        check.spinner(divs[0].children[0]);
    });

    it('structure of component when the receiving of forecast is failed', () => {
        const store = mockStore(errorState);
        const component = createComponent(store);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        check.divWeather(divs);

        check.childrenCount(divs[0], 1);
        const div = divs[0].children[0];
        check.classList(div, ['error']);
        check.textContent(div, 'Error occurred during data fetch. Try to reload');
        check.childrenCount(div, 1);
        check.tagName(div.children[0], 'BUTTON');
    });

    it('clicking on reload button', () => {
        const store = mockStore(errorState);
        const component = createComponent(store);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        const button = divs[0].children[0].children[0];
        store.clearActions();
        ReactTestUtils.Simulate.click(button);
        expect(store.getActions()).toEqual([{ type: 'FETCH_WEEK_START' }]);
    });

    it('structure of component when the forecast was successfuly received', () => {
        const store = mockStore(successState);
        const component = createComponent(store);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        check.divWeather(divs);

        check.childrenCount(divs[0], 2);
        const ul = divs[0].children[0];
        check.classList(ul, ['list-inline', 'mx-auto']);

        check.childrenCount(ul, 2);
        const li = ul.children[0];
        check.classList(li, ['list-inline-item']);
    });

});
