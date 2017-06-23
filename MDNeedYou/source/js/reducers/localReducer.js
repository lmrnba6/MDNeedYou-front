const initialState = {
    local: 'GB',

};

export default function local(state = initialState, action = {}) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE': {
            return {...state, local: action.lan }
        }
        default: return state;
    }

}