import { SET_USER, CLEAR_USER } from "../actions/actionTypes";

const initialState = {
    user: [],
}

const UserReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_USER:
            return state.user = actions.payload;

        case CLEAR_USER:
            return state.user = [];

        default:
            return state;
    }
}

export default UserReducer;