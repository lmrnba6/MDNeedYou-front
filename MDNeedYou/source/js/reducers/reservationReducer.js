export default function reducer(state = {
  reservation: null,
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "BUSINESS_SCHEDULE": {
      return {...state, business: action.payload }
    }
    case "BUSINESS_SCHEDULE_REJECTED": {
      return {...state, fetching: false, error: action.payload }
    }
    case "BUSINESS_SCHEDULE_FULFILLED": {

      // 1 - Deep clone ( JSON.parse(JSON.stringify/ _.cloneDeep )
      // 2 - ImmutableJS

      return {
          ...state,
        fetching: false,
        fetched: true,
        reservation: action.payload,
      }
    }

  }

  return state
}
