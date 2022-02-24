// Data processor
export default class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }
    addCourse(course) {
        //TODO validation of the course data
        //if course is valid, then course should be added : this.#courses.add(course)
        //if course is invalid, then the method returns full message describing what's wrong
        //if course is valid
        const validationMessage = this.#getValidationMessage(course);
        if(!validationMessage) {
            this.#courses.add(course);
        } 
        return validationMessage;
    }
    #getValidationMessage(course) {
        //TODO validate course
    }
}