import * as actions from '../../../../src/task-4/actions/week-forecast';
import * as reducers from '../../../../src/task-4/reducers/week-forecast';

describe('reducer weekError', () => {

    const reducer = reducers.weekError;

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toBe(false);
    });

    it('should handle FETCH_WEEK_START', () => {
        expect(reducer(false, {
            type: actions.FETCH_WEEK_START
        })).toBe(false);
    });

    it('should handle FETCH_WEEK_SUCCESS', () => {
        expect(reducer(false, {
            type: actions.FETCH_WEEK_SUCCESS
        })).toBe(false);
    });

    it('should handle FETCH_WEEK_FAILURE', () => {
        expect(reducer(false, {
            type: actions.FETCH_WEEK_FAILURE
        })).toBe(true);
    });

    it('should handle other actions', () => {
        expect(reducer(true, {
            type: undefined
        })).toBe(true);
    });
});


describe('reducer weekLoading', () => {

    const reducer = reducers.weekLoading;

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toBe(false);
    });

    it('should handle FETCH_WEEK_START', () => {
        expect(reducer(false, {
            type: actions.FETCH_WEEK_START
        })).toBe(true);
    });

    it('should handle FETCH_WEEK_SUCCESS', () => {
        expect(reducer(true, {
            type: actions.FETCH_WEEK_SUCCESS
        })).toBe(false);
    });

    it('should handle FETCH_WEEK_FAILURE', () => {
        expect(reducer(true, {
            type: actions.FETCH_WEEK_FAILURE
        })).toBe(false);
    });

    it('should handle other actions', () => {
        expect(reducer(true, {
            type: undefined
        })).toBe(true);
    });
});

describe('reducer weekForecast', () => {

    const reducer = reducers.weekForecast;

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual([]);
    });

    it('should handle FETCH_WEEK_START', () => {
        expect(reducer([], {
            type: actions.FETCH_WEEK_START
        })).toEqual([]);
    });

    it('should handle FETCH_WEEK_SUCCESS', () => {
        const forecast = [1, '2', 3];

        expect(reducer([], {
            type: actions.FETCH_WEEK_SUCCESS,
            weekForecast: forecast
        })).toEqual(forecast);
    });

    it('should handle FETCH_WEEK_FAILURE', () => {
        expect(reducer([], {
            type: actions.FETCH_WEEK_FAILURE
        })).toEqual([]);
    });

    it('should handle other actions', () => {
        const state = [1, '2', 3];

        expect(reducer(state, {
            type: undefined
        })).toEqual(state);
    });
});
