export const FETCH_WEEK_START = "FETCH_WEEK_START";
export const FETCH_WEEK_SUCCESS = "FETCH_WEEK_SUCCESS";
export const FETCH_WEEK_FAILURE = "FETCH_WEEK_FAILURE";

const fetchWeekStart = () => ({});

const fetchWeekSuccess = (weekForecast) => ({});

const fetchWeekFailure = e => ({});

export const fetchWeekForecast = () => (dispatch, getState) => {
};