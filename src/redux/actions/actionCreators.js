import { SET_USER,CLEAR_USER,SET_COURSES,SET_SHORTLISTED_STUDENTS } from "./actionTypes";
export const set_user=(user)=>{
    return{
        type:SET_USER,
        payload:user
    }
}
export const clear_user=()=>{
    return{
        type:CLEAR_USER
    }
}
export const set_courses=(courses)=>{
    return{
        type:SET_COURSES,
        payload:courses
    }
}
export const set_shortlisted_students=(students)=>{
    return{
        type:SET_SHORTLISTED_STUDENTS,
        payload:students
    }
}
