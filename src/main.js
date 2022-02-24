import courseData from './config/courseData.json'
import { getRandomDate, getRandomNumber } from './utils/random';
import { getRandomCourse } from './utils/randomCourse';
const N_COURSES = 100;
function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}
function getCourseItems(courses) {
    return courses.map(c => `<li>${JSON.stringify(c)}</li>`).join('');
}
//TODO rendering inside <ul>
const ulElem = document.getElementById("courses");
ulElem.innerHTML = `${getCourseItems(createCourses())}`

