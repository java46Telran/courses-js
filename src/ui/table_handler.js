export default class TableHandler {
    #tableElem
    #columnsDefinition
    #sortFnName
    constructor(columnsDefinition, idTable, sortFnName) {
        //example of columnsDefinition:
        // const columns = [{'key': 'name', 'displayName':'Course Name'},
        // {'key': 'lecturer', 'displayName': 'Lecturer Name'}... ]
        this.#sortFnName = sortFnName ?? '';
        this.#columnsDefinition = columnsDefinition;
        this.#tableElem = document.getElementById(idTable);
        if (!this.#tableElem) {
            throw "Table element is not defined"
        }


    }
    showTable(objects) {
        this.#tableElem.innerHTML = `${this.#getHeader()}${this.#getBody(objects)}`;
    }
    hideTable() {
        this.#tableElem.innerHTML = ''
    }
    #getHeader() {
        return `<thead><tr>${this.#getColumns()}</tr></thead>`
    }
    #getColumns() {
        return this.#columnsDefinition.map(c => `<th onclick="${this.#getSortFn(c)}">${c.displayName}</th>`).join('');
    }
    #getSortFn(columnDefinition) {
        return this.#sortFnName ? `${this.#sortFnName}('${columnDefinition.key}')` : ''
    }
    #getBody(objects) {
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object) {
        return this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`).join('');
    }
}