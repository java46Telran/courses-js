// fake Data provisioning module

import { getRandomNumber } from "../utils/random";

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
        return course;
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
        return !!this.#courses.find(c => c.id === id);
    }
    get() {
        return this.#courses;
    }
    remove(id) {
        const index = this.#courses.findIndex(c => c.id === id);
        const res = this.#courses[index];
        this.#courses.splice(index, 1);
        return res;
    }
}