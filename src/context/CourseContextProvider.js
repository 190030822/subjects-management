import CourseContext from "./CourseContext"
import { useReducer, useEffect} from "react";
import { getCourses } from "../middleware/coursesMiddleware";

export const ACTION_TYPE = {
    ADD_COURSE : "addCourse",
    GET_COURSES : "getCourses",
    UPDATE_COURSE : "updateCourse",
    DELETE_COURSE : "deleteCourse",
    LOADING : "loadingState",
    ERROR : "errorState",
    NONE : "none"
}

export const RequestStatus = {
    LOADING : "loading",
    SUCCESS : "success",
    ERROR : "error",
    NONE : "none"
}

const globalCoursesData = {
    actionType : ACTION_TYPE.NONE,
    courses : [],
    requestStatus : {type : RequestStatus.NONE, message : ""}
}


const coursesReducer = (globalCoursesState, action) => {
    switch(action.type) {
        case ACTION_TYPE.GET_COURSES : {
            return {
                ...globalCoursesState,
                courses : action.payload,
                requestStatus : {type : RequestStatus.SUCCESS, message : "Courses fetched successfully"}
            }
        }

        case ACTION_TYPE.ADD_COURSE : {
            return {
                ...globalCoursesState,
                courses : [...globalCoursesState.courses, action.payload],
                requestStatus : {type : RequestStatus.SUCCESS, message : "Course Created Successfully"}
            }
        }

        case ACTION_TYPE.UPDATE_COURSE : {

            return {
                ...globalCoursesState,
                courses : [...globalCoursesState.courses.filter((course) => course.courseId !== action.payload.courseId), action.payload],
                requestStatus : {type : RequestStatus.SUCCESS, message : "Course Updated Successfully"}
            }
        }

        case ACTION_TYPE.LOADING : {
            return {
                ...globalCoursesState,
                actionType : action.payload,
                requestStatus : {type : RequestStatus.LOADING, message : "Loading"}
            }
        }

        case ACTION_TYPE.ERROR : {
            return {
                ...globalCoursesState,
                requestStatus : {type : RequestStatus.ERROR, message : action.payload}
            }
        }

        default : return globalCoursesState;
    }
} 


const CourseContextProvider = ({children}) => {

    const [coursesState, dispatcher] = useReducer(coursesReducer, globalCoursesData);

    useEffect(()=> {
        getCourses(dispatcher);
    }, [])

    return <CourseContext.Provider value = {{coursesState, dispatcher}}>
        {children}
    </CourseContext.Provider>
}

export default CourseContextProvider;