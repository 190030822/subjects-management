
import { ACTION_TYPE } from "../context/CourseContextProvider";
import { getCoursesService, addCourseService, updateCourseService } from "../services/courseService";

export const getCourses = async (dispatcher) => {
    dispatcher({type : ACTION_TYPE.LOADING, payload : ACTION_TYPE.GET_COURSES});
    try {
        const data = await getCoursesService();
        dispatcher({type : ACTION_TYPE.GET_COURSES, payload : data});
    } catch (e) {
        dispatcher({type : ACTION_TYPE.ERROR, payload : e.message})
    }

}

export const addCourse = async (course, dispatcher) => {
    dispatcher({type : ACTION_TYPE.LOADING, payload : ACTION_TYPE.ADD_COURSE})
    try {
        const data = await addCourseService(course);
        dispatcher({type : ACTION_TYPE.ADD_COURSE, payload: data})
    } catch (e) {
        dispatcher({type : ACTION_TYPE.ERROR, payload : e.message})
    }  
}

export const updateCourse = async (course, dispatcher) => {
    dispatcher({type : ACTION_TYPE.LOADING, payload : ACTION_TYPE.UPDATE_COURSE})
    try {
        const data = await updateCourseService(course);
        dispatcher({type : ACTION_TYPE.UPDATE_COURSE, payload : data});
    } catch(e) {
        dispatcher({type : ACTION_TYPE.ERROR, payload : e.message});
    }
}