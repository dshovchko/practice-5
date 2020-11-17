import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import chai from 'chai';
import sinon from 'sinon';

import * as actions from '../../../../src/task-4/actions/week-forecast';
import { api } from '../../../../src/task-4/api';

const mockStore = configureMockStore([ thunk]);
const assert = chai.assert;

const state = {
    weekForecast: [],
    weekLoading: false,
    weekError: false
};

describe('actions fetchWeekForecast()', () => {
    let stub;
    beforeEach(() => {
        stub = sinon.stub(api, 'getWeekForecast');
    });
    afterEach(() => {
        stub.restore();
    });

    it('should create FETCH_WEEK_START at initial state', () => {

        const expectedActions = [
            { type: actions.FETCH_WEEK_START }
        ];
        const store = mockStore(state);
        stub.resolves('Week Forecast');

        store.dispatch(actions.fetchWeekForecast());
        assert.deepEqual(store.getActions(), expectedActions, 'checking expected actions');
    });

    it('should create nothing when week forecast is loading', () => {

        const expectedActions = [];
        const store = mockStore({
            weekForecast: [],
            weekLoading: true,
            weekError: false
        });
        stub.resolves('Week Forecast');

        store.dispatch(actions.fetchWeekForecast());
        assert.deepEqual(store.getActions(), expectedActions, 'checking expected actions');
    });

    it('creates FETCH_WEEK_SUCCESS when fetching forecast has been done', () => {

        const expectedActions = [
            { type: actions.FETCH_WEEK_START },
            { type: actions.FETCH_WEEK_SUCCESS, weekForecast: 'Week Forecast' }
        ];
        const store = mockStore( state );
        stub.resolves('Week Forecast');

        return store.dispatch(actions.fetchWeekForecast())
            .then(() => {
                assert.deepEqual(store.getActions(), expectedActions, 'checking expected actions');
            });
    });

    it('creates FETCH_WEEK_FAILURE when fetching forecast has got error', () => {

        const expectedActions = [
            { type: actions.FETCH_WEEK_START },
            { type: actions.FETCH_WEEK_FAILURE, error: 'Week forecast fetch failed.' }
        ];
        const store = mockStore(state);
        stub.rejects(new Error('Week forecast fetch failed.'));

        return store.dispatch(actions.fetchWeekForecast())
            .then(() => {
                assert.deepEqual(store.getActions(), expectedActions, 'checking expected actions');
            });
    });
});
