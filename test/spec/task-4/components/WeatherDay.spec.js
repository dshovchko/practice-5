import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import check from '../check';
import WeatherDay from '../../../../src/task-4/components/WeatherDay';

const mockStore = configureMockStore([ thunk]);

const dayForecast = {
    dt: 1524776400000,
    temp: {
        min: -0.47,
        max: 12.6
    },
    pressure: 978,
    humidity: 32,
    weather: {
        description: 'Shower rain',
        icon: 'shower-rain'
    },
    speed: 11.97,
    deg: 158,
    clouds: 94
};

const createComponent = store => ReactTestUtils.renderIntoDocument(
    <Provider store={store}>
        <WeatherDay day={dayForecast}/>
    </Provider>
);


describe('<WeatherDay />', () => {

    it('type', () => {
        expect(ReactTestUtils.isElementOfType(<WeatherDay />, WeatherDay)).toBeTruthy();
    });

    it('structure of component', () => {
        const store = mockStore({
            selectedDt: null
        });
        const component = createComponent(store);

        const lis = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
        expect(lis.length).toBeGreaterThanOrEqual(1);
        check.className(lis[0], 'list-inline-item');
        check.childrenCount(lis[0], 3);

        const div1 = lis[0].children[0];
        check.tagName(div1, 'DIV');
        check.classList(div1, ['day-name']);
        check.textContent(div1, 'Fri');

        const img = lis[0].children[1];
        check.tagName(img, 'IMG');
        expect(img.src.substr(-19)).toBe('img/shower-rain.png');
        expect(img.alt).toBe('Shower rain');

        const div2 = lis[0].children[2];
        check.tagName(div2, 'DIV');
        check.classList(div2, ['temp']);
        check.textContent(div2, '-0℃ 13℃');
    });

    it('structure of component when it is selected', () => {

        const store = mockStore({
            selectedDt: 1524776400000
        });
        const component = createComponent(store);

        const lis = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
        check.classList(lis[0], ['active']);
    });

    it('clicking on component', () => {

        const store = mockStore({
            selectedDt: null
        });
        const component = createComponent(store);

        const lis = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
        store.clearActions();
        ReactTestUtils.Simulate.click(lis[0]);
        expect(store.getActions()).toEqual([{ type: 'OPEN_DAY_DETAILS', dt: 1524776400000 }]);
    });
});
