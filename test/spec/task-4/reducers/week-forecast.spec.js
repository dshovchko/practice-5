import chai from 'chai';

import * as actions from '../../../../src/task-4/actions/week-forecast';
import * as reducers from '../../../../src/task-4/reducers/week-forecast';

const assert = chai.assert;

describe('reducer weekError', () => {

    const reducer = reducers.weekError;

    it('should return initial state', () => {
        assert.equal(reducer(undefined, {}), false);
    });

    it('should handle FETCH_WEEK_START', () => {
        assert.equal(reducer(false, {
            type: actions.FETCH_WEEK_START
        }), false);
    });

    it('should handle FETCH_WEEK_SUCCESS', () => {
        assert.equal(reducer(false, {
            type: actions.FETCH_WEEK_SUCCESS
        }), false);
    });

    it('should handle FETCH_WEEK_FAILURE', () => {
        assert.equal(reducer(false, {
            type: actions.FETCH_WEEK_FAILURE
        }), true);
    });

    it('should handle other actions', () => {
        assert.equal(reducer(true, {
            type: undefined
        }), true);
    });
});


describe('reducer weekLoading', () => {

    const reducer = reducers.weekLoading;

    it('should return initial state', () => {
        assert.equal(reducer(undefined, {}), false);
    });

    it('should handle FETCH_WEEK_START', () => {
        assert.equal(reducer(false, {
            type: actions.FETCH_WEEK_START
        }), true);
    });

    it('should handle FETCH_WEEK_SUCCESS', () => {
        assert.equal(reducer(true, {
            type: actions.FETCH_WEEK_SUCCESS
        }), false);
    });

    it('should handle FETCH_WEEK_FAILURE', () => {
        assert.equal(reducer(true, {
            type: actions.FETCH_WEEK_FAILURE
        }), false);
    });

    it('should handle other actions', () => {
        assert.equal(reducer(true, {
            type: undefined
        }), true);
    });
});

describe('reducer weekForecast', () => {

    const reducer = reducers.weekForecast;

    it('should return initial state', () => {
        assert.deepEqual(reducer(undefined, {}), []);
    });

    it('should handle FETCH_WEEK_START', () => {
        assert.deepEqual(reducer([], {
            type: actions.FETCH_WEEK_START
        }), []);
    });

    it('should handle FETCH_WEEK_SUCCESS', () => {
        const forecast = [1, '2', 3];

        assert.deepEqual(reducer([], {
            type: actions.FETCH_WEEK_SUCCESS,
            weekForecast: forecast
        }), forecast);
    });

    it('should handle FETCH_WEEK_FAILURE', () => {
        assert.deepEqual(reducer([], {
            type: actions.FETCH_WEEK_FAILURE
        }), []);
    });

    it('should handle other actions', () => {
        const state = [1, '2', 3];

        assert.deepEqual(reducer(state, {
            type: undefined
        }), state);
    });
});
