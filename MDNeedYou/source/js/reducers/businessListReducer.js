export default function reducer(state = {
  businessList: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {

    case "BUSINESS_FILTERED": {
      return {...state, businessList: action.payload }
    }
    case "CITY_BUSINESS": {
      return {...state, fetching: true }
    }
    case "CITY_BUSINESS_REJECTED": {
      return {...state, fetching: false, error: action.payload }
    }
    case "CITY_BUSINESS_FULFILLED": {

      // 1 - Deep clone ( JSON.parse(JSON.stringify/ _.cloneDeep )
      // 2 - ImmutableJS

      return {
          ...state,
        fetching: false,
        fetched: true,
        businessList: action.payload,
      }
    }

  }

  return state
}
