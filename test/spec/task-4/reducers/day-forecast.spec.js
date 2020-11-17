import chai from 'chai';

import * as actions from '../../../../src/task-4/actions/day-forecast';
import * as reducers from '../../../../src/task-4/reducers/day-forecast';

const assert = chai.assert;

describe('reducer dayForecast', () => {

    const reducer = reducers.dayForecast;

    it('should return initial state', () => {
        assert.deepEqual(reducer(undefined, {}), {});
    });

    it('should handle FETCH_DAY_START', () => {

        const prevState = {};
        const newState = {
            '1523998800000': {
                data: null,
                loading: true,
                error: false
            }
        };
        assert.deepEqual(reducer(prevState, {
            type: actions.FETCH_DAY_START,
            dt: 1523998800000
        }), newState);
    });

    it('should handle FETCH_DAY_SUCCESS', () => {
        const prevState = {
            '1524603600000': {
                data: null,
                loading: true,
                error: false
            }
        };
        const newState = {
            '1524603600000': {
                data: {
                    dt: 1524603600000,
                    temp: {
                        min: -3.47,
                        max: 24.88
                    },
                    pressure: 974,
                    humidity: 1,
                    weather: {
                        description: 'Thunder and rain',
                        icon: 'thunderstorm'
                    },
                    speed: 10.06,
                    deg: 29,
                    clouds: 19
                },
                loading: false,
                error: false
            }
        };
        assert.deepEqual(reducer(prevState, {
            type: 'FETCH_DAY_SUCCESS',
            dayForecast: {
                dt: 1524603600000,
                temp: {
                    min: -3.47,
                    max: 24.88
                },
                pressure: 974,
                humidity: 1,
                weather: {
                    description: 'Thunder and rain',
                    icon: 'thunderstorm'
                },
                speed: 10.06,
                deg: 29,
                clouds: 19
            }
        }), newState);
    });

    it('should handle FETCH_DAY_FAILURE', () => {
        const prevState = {
            '1523998800000': {
                data: null,
                loading: true,
                error: false
            }
        };
        const newState = {
            '1523998800000': {
                data: null,
                loading: false,
                error: true
            }
        };
        assert.deepEqual(reducer(prevState, {
            type: actions.FETCH_DAY_FAILURE,
            dt: 1523998800000
        }), newState);
    });

    it('should handle other actions', () => {
        const state = {
            '1523998800000': {
                data: null,
                loading: false,
                error: false
            }
        };

        assert.equal(reducer(state, {
            type: undefined
        }), state);
    });
});


describe('reducer selectedDb', () => {

    const reducer = reducers.selectedDt;

    it('should return initial state', () => {
        assert.isNull(reducer(undefined, {}));
    });

    it('should handle OPEN_DAY_DETAILS', () => {
        assert.equal(reducer(null, {
            type: actions.OPEN_DAY_DETAILS,
            dt: 123456789
        }), 123456789);
    });

    it('should handle other actions', () => {
        assert.equal(reducer(123456789, {
            type: undefined
        }), 123456789);
    });
});
