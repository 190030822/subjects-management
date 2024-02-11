import { toast, ToastContainer } from "react-toastify"
import {useContext, useEffect, useReducer, useState} from 'react';
import { getCourses } from "../middleware/coursesMiddleware";
import 'react-toastify/dist/ReactToastify.css'
import CourseForm from "./CourseForm";
import CourseContext from "../context/CourseContext";
import { ACTION_TYPE, RequestStatus } from "../context/CourseContextProvider";

export const Fields = {
    TITLE : "title",
    DESCRIPTION : "description",
    INSTRUCTOR : "instructor",
    DURATION : "courseDuration",
    START_DATE : "startDate",
    END_DATE : "endDate",
    SYLLABUS : "syllabus"
}
export const initalCourseData = {
    [Fields.TITLE] : "",
    [Fields.DESCRIPTION] : "",
    [Fields.INSTRUCTOR] : "",
    [Fields.DURATION] : "",
    [Fields.START_DATE] : "",
    [Fields.END_DATE] : "",
    [Fields.SYLLABUS] : "",
}




const CourseList = () => {

    const {coursesState, dispatcher} = useContext(CourseContext);
    const [emptyOrEditDataState, setEmptyOrEditDataState] = useState(initalCourseData);


    const getCoursesOnStatus = (coursesState, dispatcher)  => {

        if (coursesState.actionType === ACTION_TYPE.GET_COURSES) {
            switch(coursesState.requestStatus.type) {
                case RequestStatus.LOADING : return <center>LOADING ...</center>
                case RequestStatus.SUCCESS : {
                    return coursesTable(coursesState, dispatcher);
                }
                default : {
                    return <center>Something went wrong</center>;
                }
            }
        } else {
            return coursesTable(coursesState, dispatcher);
        }
    }

    const coursesTable = (coursesState, dispatcher) => {

        if (!coursesState.courses.length) {
            return <center>NO COURSES AVAIALBLE</center>
        }
        return <table border = "1" style={{"backgroundColor" : "black"}}>
            <thead style={{"backgroundColor" : "blue"}}>
                <tr>
                    {
                        Object.keys(Fields).map((key) => {
                            return <th key= {key} >{Fields[key]}</th>
                        })
                    }
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody style={{"backgroundColor" : "yellow"}}>
                <>
                    {
                        coursesState.courses.map((course) => {
                            return <tr key = {course.courseId}>
                                <>
                                    {
                                        Object.keys(Fields).map((key) => {
                                            return <td key = {key}>{course[Fields[key]]}</td>
                                        })
                                    }
                                    <td><input type = "submit" value = "EDIT" onClick= {(e) =>  handleEditCourse(e, course)}/></td>
                                    <td><input type = "submit" value = "DELETE" onClick= {(e) =>  null}/></td>
                                </>
                            </tr>
                        })
                    }
                </>
            </tbody>
            <tbody>

            </tbody>
        </table>
    }

    const handleEditCourse = (e, course) => {
        setEmptyOrEditDataState(course);
    }

    return <>
        <section>
            <CourseForm emptyOrEditData = {emptyOrEditDataState} />
        </section>
        <section>
            {getCoursesOnStatus(coursesState, dispatcher)}
        </section>
        <ToastContainer/>
        
    </>
}


export default CourseList;