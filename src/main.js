import courseData from './config/courseData.json'
import College from './services/college';
import { dataProvider, URL } from './config/services-config';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash'
import NavigatorButtons from './ui/navigator_buttons';
import Spinner from './ui/spinner';
import Alert from './ui/alert';
const statisticsColumnDefinition = [
    { key: "minInterval", displayName: "From" },
    { key: "maxInterval", displayName: "To" },
    { key: "amount", displayName: "Amount" }
]



const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    { key: 'id', displayName: 'ID' },
    { key: 'name', displayName: 'Course' },
    { key: 'lecturer', displayName: 'Lecturer' },
    { key: 'cost', displayName: "Cost (ILS)" },
    { key: 'hours', displayName: "Duration (h)" },
    {key: 'openingDate', displayName: "Date"}
], "courses-table", "sortCourses", "removeCourse");
const formHandler = new FormHandler("courses-form", "alert");
const generationHandler = new FormHandler("generation-form", "alert");
const navigator = new NavigatorButtons(["0","1","2", "3", "4"]);
const spinner = new Spinner("spinner");
const alertServerUnavailable = new Alert("server-unavailable")
async function asyncRequestWithSpinner(asyncFn) {
    spinner.start();
    alertServerUnavailable.hideAlert();
    let res;
    try {
         res = await asyncFn();
    } catch (err) {
        hide();
        alertServerUnavailable.showAlert
        (`${err} server ${URL} is unavailable, repeat request later on`, 'danger')
    }
    spinner.stop();
    return res;
}
formHandler.addHandler(async course => {
    const res = await asyncRequestWithSpinner
     (dataProcessor.addCourse.bind(dataProcessor, course)); //await dataProcessor.addCourse(course)
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;

})
generationHandler.addHandler(async generation => {
    for (let i=0; i < generation.nCourses; i++) {
         asyncRequestWithSpinner ( 
             dataProcessor.addCourse.bind(dataProcessor, getRandomCourse(courseData)));
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
window.showCourses = async () => {
    hide();
    navigator.setActive(1);
    tableHandler.showTable
    (await asyncRequestWithSpinner(dataProcessor.getAllCourses.bind(dataProcessor)));

}
window.showHoursStatistics = async () => {
    hide()
    navigator.setActive(2);
    tableHoursStatistics.showTable(await asyncRequestWithSpinner 
        (dataProcessor.getHoursStatistics.bind(dataProcessor, courseData.hoursInterval)));

}
window.showCostStatistics = async () => {
    hide()
    navigator.setActive(3);
    tableCostStatistics.showTable(await asyncRequestWithSpinner 
        (dataProcessor.getCostStatistics.bind(dataProcessor, courseData.costInterval)));

}
window.sortCourses = async (key) => {
    tableHandler.showTable(await asyncRequestWithSpinner (dataProcessor.sortCourses.bind(dataProcessor, key)))
}
window.removeCourse = async (id) => {
    if (window.confirm(`you are going to remove course id: ${id}`)) {
        await asyncRequestWithSpinner (dataProcessor.removeCourse.bind(dataProcessor, +id));
        tableHandler.showTable(await asyncRequestWithSpinner(dataProcessor.getAllCourses.bind(dataProcessor)));
    }

}
