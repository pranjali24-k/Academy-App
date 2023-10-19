import { SET_COURSES } from "../actions/actionTypes";

const initialState = {
    courses: []
}

const CoursesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_COURSES:
            return state.user = actions.payload;

        default:
            return state;
    }
}

export default CoursesReducer;