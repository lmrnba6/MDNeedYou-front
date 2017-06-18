const initialState = {
    hours: [],
    fetching: false,
    fetched: false,
    error: null,
};

export default function hoursReducer(state = initialState, action = {}) {

    switch (action.type) {
        case "BUSINESS_HOURS": {
            return {...state, hours: action.payload }
        }
        default: return state;
    }

}
