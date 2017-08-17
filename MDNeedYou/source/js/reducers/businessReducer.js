export default function reducer(state = {
  business: '',
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "ID_BUSINESS": {
      return {...state, fetching: true }
    }
    case "ID_BUSINESS_REJECTED": {
      return {...state, fetching: false, error: action.payload }
    }
    case "BUSINESS_UPDATED":{
       return {
          ...state,
        fetching: false,
        fetched: true,
        business: action.payload,
      }
    }
    case "ID_BUSINESS_FULFILLED": {
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
