import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import * as actions from '../../../../src/task-4/actions/day-forecast';
import { api } from '../../../../src/task-4/api';

const mockStore = configureMockStore([ thunk]);

describe('actions fetchDayForecast()', () => {
    let stub;
    beforeEach(() => {
        stub = sinon.stub(api, 'getDayForecast');
        stub.withArgs(12345).resolves('Day Forecast');
        stub.rejects(new Error('Day forecast fetch failed.'));
    });
    afterEach(() => {
        stub.restore();
    });

    it('should create FETCH_DAY_START at initial state', () => {

        const expectedActions = [
            { type: actions.FETCH_DAY_START, dt: 12345 }
        ];
        const store = mockStore({
            dayForecast: {}
        });
        store.dispatch(actions.fetchDayForecast(12345));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create nothing when data is already present', () => {

        const expectedActions = [];
        const store = mockStore({
            dayForecast: {
                '12345': {
                    data: {},
                    loading: false,
                    error: false
                }
            }
        });
        store.dispatch(actions.fetchDayForecast(12345));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create nothing when day forecast is loading', () => {

        const expectedActions = [];
        const store = mockStore({
            dayForecast: {
                '12345': {
                    data: null,
                    loading: true,
                    error: false
                }
            }
        });
        store.dispatch(actions.fetchDayForecast(12345));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create FETCH_DAY_SUCCESS when fetching forecast has been done', () => {

        const expectedActions = [
            { type: actions.FETCH_DAY_START, dt: 12345 },
            { type: actions.FETCH_DAY_SUCCESS, dayForecast: 'Day Forecast' }
        ];
        const store = mockStore({ dayForecast: {} });

        return store.dispatch(actions.fetchDayForecast(12345))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create FETCH_DAY_FAILURE when fetching forecast has got error', () => {

        const expectedActions = [
            { type: actions.FETCH_DAY_START, dt: 1 },
            { type: actions.FETCH_DAY_FAILURE, dt: 1, error: 'Day forecast fetch failed.' }
        ];
        const store = mockStore({ dayForecast: {0: {}} });

        return store.dispatch(actions.fetchDayForecast(1))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});


describe('action openDayDetails()', () => {
    it('should be null when dt already in store', () => {
        const expectedAction = [
            { type: actions.OPEN_DAY_DETAILS, dt: null }
        ];
        const store = mockStore({ selectedDt: 12345 });

        store.dispatch(actions.openDayDetails(12345));

        expect(store.getActions()).toEqual(expectedAction);
    });

    it('should be set by current dt', () => {
        const expectedAction = [
            { type: actions.OPEN_DAY_DETAILS, dt: 12345 }
        ];
        const store = mockStore({ selectedDt: null });

        store.dispatch(actions.openDayDetails(12345));

        expect(store.getActions()).toEqual(expectedAction);
    });
});
