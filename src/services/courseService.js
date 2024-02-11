
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/courses-management/";
axios.defaults.headers.common['Content-Type'] = 'application/json';


export const getCoursesService = async () => {
    try {
        const response =  await axios.get("getAllCourses");
        return response.data;
    } catch (e) {
        throw new Error(JSON.stringify(e.message))
    }
}

export const addCourseService = async (course) => {
    try {
        const response = await axios.post("addCourse", course);
        return response.data;
    } catch(e) {
        throw new Error(JSON.stringify(e.response.data))
    }
}

export const updateCourseService = async (course) => {
    try {
        const response = await axios.put("updateCourse/"+course.courseId, course);
        return response.data;
    } catch (e) {
        throw new Error(JSON.stringify(e.response.data))
    }
}