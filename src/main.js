import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash'
const N_COURSES = 5;
const statisticsColumnDefinition = [
    { key: "minInterval", displayName: "From" },
    { key: "maxInterval", displayName: "To" },
    { key: "amount", displayName: "Amount" }
]
function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}


const courses = createCourses();

const dataProvider = new Courses(courseData.minId, courseData.maxId, courses);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    { key: 'id', displayName: 'ID' },
    { key: 'name', displayName: 'Course' },
    { key: 'lecturer', displayName: 'Lecturer' },
    { key: 'cost', displayName: "Cost (ILS)" },
    { key: 'hours', displayName: "Duration (h)" }
], "courses-table", "sortCourses", "removeCourse");
const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course);
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;

})
formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);
const tableHoursStatistics =
    new TableHandler(statisticsColumnDefinition, "courses-table");
const tableCostStatistics =
    new TableHandler(statisticsColumnDefinition, "courses-table");
function hide() {
    tableHandler.hideTable();
    formHandler.hide();
    tableHoursStatistics.hideTable();
    tableCostStatistics.hideTable();

}
window.showForm = () => {
    hide();
    formHandler.show();

}
window.showCourses = () => {
    hide();
    tableHandler.showTable(dataProcessor.getAllCourses());

}
window.showHoursStatistics = () => {
    hide()
    tableHoursStatistics.showTable(dataProcessor.getHoursStatistics(courseData.hoursInterval));

}
window.showCostStatistics = () => {
    hide()
    tableCostStatistics.showTable(dataProcessor.getCostStatistics(courseData.costInterval));

}
window.sortCourses = (key) => {
    tableHandler.showTable(dataProcessor.sortCourses(key))
}
window.removeCourse = (id) => {
    if (window.confirm(`you are going to remove course id: ${id}`)) {
        dataProcessor.removeCourse(+id);
        tableHandler.showTable(dataProcessor.getAllCourses());
    }

}
