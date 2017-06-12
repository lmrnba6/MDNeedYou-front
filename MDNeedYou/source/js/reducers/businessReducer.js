export default function reducer(state = {
  business: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "BUSINESS_SCHEDULE": {
      return {...state, business: action.payload}
    }
    case "BUSINESS_FILTERED": {
      return {...state, business: action.payload}
    }
    case "BUSINESS_HOURS": {
      return {...state, business: action.payload}
    }
    case "FETCH_BUSINESS": {
      return {...state, fetching: true }
    }
    case "FETCH_BUSINESS_REJECTED": {
      return {...state, fetching: false, error: action.payload }
    }
    case "FETCH_BUSINESS_FULFILLED": {
      return {
          ...state,
        fetching: false,
        fetched: true,
        business: action.payload,
      }
    }

  }

  return state
}
