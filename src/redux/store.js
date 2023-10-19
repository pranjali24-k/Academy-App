import { createStore } from "redux";
import UserReducer from "./reducers/UserReducer";
import { combineReducers } from "redux";
import CoursesReducer from "./reducers/CoursesReducer";
const rootReducer = combineReducers({
    user:UserReducer,
    courses:CoursesReducer
})
const store = createStore(rootReducer);

export default store;
