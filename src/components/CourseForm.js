import { useEffect, useContext, useState } from "react";
import InputElement from "./InputElement";
import { Fields, initalCourseData } from "./CourseList";
import CourseContext from "../context/CourseContext"
import { ACTION_TYPE, RequestStatus } from "../context/CourseContextProvider";
import { addCourse, updateCourse } from "../middleware/coursesMiddleware";


const CourseForm = (props) => {

    const [courseState, setCourseState] = useState(props.emptyOrEditData);
    const [validationErrors, setValidationErrors] = useState({...initalCourseData});
    const {coursesState, dispatcher} = useContext(CourseContext);

    const isAddCourseType = (actionType) => coursesState.actionType === actionType; 

    useEffect(() => {
        setCourseState(props.emptyOrEditData);
        setValidationErrors({   
            END_DATE : "endDate",
            SYLLABUS : "syllabus"
        })
    }, [props.emptyOrEditData]);


    const handleInputChange = (e, field) => {
        setCourseState((prevState) => {return {...prevState, [field]: e.target.value}});
        const value = e.target.value;
        switch(field) {
            case Fields.TITLE : {
                if (!value.trim() || value.length <= 1) {
                    validationErrors.title = "title should be min one character";
                } else {
                    delete validationErrors.title;
                }
                return;
            }
            case Fields.DESCRIPTION :
            case Fields.INSTRUCTOR :
            case Fields.START_DATE : {
                if (!value.trim()) {
                    validationErrors[field] = field + " should not be empty";
                } else {
                    delete validationErrors[field];
                }
                return;
            }
            case Fields.DURATION : {

                if (value === "0" || !value) {
                    validationErrors[field] = field + " should not be empty or zero";
                } else {
                    console.log(value+ "sfgsrg");
                    delete validationErrors[field];
                }
                return;
            }
            case Fields.END_DATE : {
                if ((value && courseState.startDate) && new Date(value) < new Date(courseState.startDate)) {
                    validationErrors[field] = "End date should be after start date";
                    validationErrors["extra"] = "extra error";
                } else {
                    delete validationErrors["extra"];
                }
                return;
            }
            default : {return}
        }
    }


    const instructorsList = ["Rammaiah", "pradeepini", "srikanth"]

    const handleCourseSubmit =  async (e) => {
        e.preventDefault();
        if (!courseState.courseId) {
            await addCourse(courseState, dispatcher)
        } else {
            await updateCourse(courseState, dispatcher)
        }
        setCourseState({...initalCourseData})
        setValidationErrors({...initalCourseData})
 
    }

    return <>
    <form onSubmit = {handleCourseSubmit}>
        <InputElement type = "text" name = {Fields.TITLE} value = {courseState.title} onChange={(e) => handleInputChange(e, Fields.TITLE)} />
        {validation(validationErrors.title)}
        <div>
            <label htmlFor={Fields.DESCRIPTION}>{Fields.DESCRIPTION}</label>
            <textarea id = {Fields.DESCRIPTION} name = {Fields.DESCRIPTION} value = {courseState.description} onChange={(e) => handleInputChange(e, Fields.DESCRIPTION)}></textarea>
        </div>
        {validation(validationErrors.description)}
        <div>
            <label htmlFor= {Fields.INSTRUCTOR}>{Fields.INSTRUCTOR} :</label>
            <select id = {Fields.INSTRUCTOR} value = {courseState.instructor} onChange={(e) => handleInputChange(e, Fields.INSTRUCTOR)}>
                    <option value = "">choose instructor</option>
                    <>
                        {
                            instructorsList.map((instructor) => <option key = {instructor} value = {instructor}>{instructor}</option>)
                        }
                    </>
            </select>
        </div>
        {validation(validationErrors.instructor)}
        <InputElement type = "number" name = {Fields.DURATION} value = {courseState.courseDuration} onChange={(e) => handleInputChange(e, Fields.DURATION)} />
        {validation(validationErrors.courseDuration)}
        <InputElement type = "date" name = {Fields.START_DATE} value = {courseState.startDate} onChange={(e) => handleInputChange(e, Fields.START_DATE)} />
        {validation(validationErrors.startDate)}
        <InputElement type = "date" name = {Fields.END_DATE} value = {courseState.endDate} onChange={(e) => handleInputChange(e, Fields.END_DATE)} />
        {validation(validationErrors.endDate)}
        <div>
            <label htmlFor={Fields.SYLLABUS}>{Fields.SYLLABUS}</label>
            <textarea id = {Fields.SYLLABUS} name = {Fields.SYLLABUS} value = {courseState.syllabus} onChange={(e) => handleInputChange(e, Fields.SYLLABUS)}></textarea>
        </div>
        <input type = "submit" disabled = {!(!courseState.courseId) || Object.keys(validationErrors).length > 2} value = {(isAddCourseType(ACTION_TYPE.ADD_COURSE) && coursesState.requestStatus.type === RequestStatus.LOADING) ? "Loading" : "Create"} />
        {!(!courseState.courseId) && <input type = "submit" disabled = {Object.keys(validationErrors).length > 2} value = {(isAddCourseType(ACTION_TYPE.UPDATE_COURSE) && coursesState.requestStatus.type === RequestStatus.LOADING) ? "Loading" : "Update"} />}
    </form>
    </>

}

const validation = (value) => {
    return value && <span style={ {"color" : "red"} }>{value}</span>
}

export default CourseForm;