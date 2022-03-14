// fake Data provisioning module

import { getRandomNumber } from "../utils/random";
function getPromise(timeout, value) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value)
        }, timeout)
    })
}
//data are the regular JS array
export default class Courses {
    #courses
    #minId
    #maxId
    constructor(minId, maxId, courses) {
        this.#courses =  courses ?? [];
        this.#minId = minId ?? 1;
        this.#maxId = maxId ?? 10000000;

    }
    add(course) {
        course.id = this.#getId();
        this.#courses.push(course);
        return getPromise(1000, course);
    }
    #getId() {
        //return unique value of id
        let id;
        do {
            id = getRandomNumber(this.#minId, this.#maxId)
        }while(this.exists(id));
        return id;
    }
    exists(id) {
        return getPromise(100, !!this.#courses.find(c => c.id === id));
    }
    get() {
        return getPromise(2000, this.#courses);
    }
    remove(id) {
        const index = this.#courses.findIndex(c => c.id === id);
        const res = this.#courses[index];
        this.#courses.splice(index, 1);
        return getPromise(1000, res);
    }
}