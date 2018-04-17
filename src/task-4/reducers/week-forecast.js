import {
    FETCH_WEEK_START,
    FETCH_WEEK_SUCCESS,
    FETCH_WEEK_FAILURE } from "../actions/week-forecast";

const weekForecast = (state = [], action) => {
    return state;
};

const weekLoading = (state = false, action) => {
    return state;
};

const weekError = (state = false, action) => {
    return state;
};

export { weekForecast, weekLoading, weekError };
