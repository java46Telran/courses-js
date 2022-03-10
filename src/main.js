import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash'
import NavigatorButtons from './ui/navigator_buttons';
const N_COURSES = 5;
const statisticsColumnDefinition = [
    { key: "minInterval", displayName: "From" },
    { key: "maxInterval", displayName: "To" },
    { key: "amount", displayName: "Amount" }
]


const dataProvider = new Courses(courseData.minId, courseData.maxId);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    { key: 'id', displayName: 'ID' },
    { key: 'name', displayName: 'Course' },
    { key: 'lecturer', displayName: 'Lecturer' },
    { key: 'cost', displayName: "Cost (ILS)" },
    { key: 'hours', displayName: "Duration (h)" }
], "courses-table", "sortCourses", "removeCourse");
const formHandler = new FormHandler("courses-form", "alert");
const generationHandler = new FormHandler("generation-form", "alert");
const navigator = new NavigatorButtons(["0","1","2", "3", "4"])
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course);
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;

})
generationHandler.addHandler(generation => {
    for (let i=0; i < generation.nCourses; i++) {
        dataProcessor.addCourse(getRandomCourse(courseData));
    }
    return '';
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
    generationHandler.hide();
    tableHoursStatistics.hideTable();
    tableCostStatistics.hideTable();

}
window.showGeneration = () => {
    hide();
    navigator.setActive(4);
    generationHandler.show();
}
window.showForm = () => {
    hide();
    navigator.setActive(0);
    formHandler.show();

}
window.showCourses = () => {
    hide();
    navigator.setActive(1);
    tableHandler.showTable(dataProcessor.getAllCourses());

}
window.showHoursStatistics = () => {
    hide()
    navigator.setActive(2);
    tableHoursStatistics.showTable(dataProcessor.getHoursStatistics(courseData.hoursInterval));

}
window.showCostStatistics = () => {
    hide()
    navigator.setActive(3);
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
