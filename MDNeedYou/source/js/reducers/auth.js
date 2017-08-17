import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  business: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuthenticated: action.business.address!=null,
        business: action.business
      };
    default: return state;
  }
}