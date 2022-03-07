export default class TableHandler {
    #tableElem
    #columnsDefinition
    #sortFnName
    #removeFnName
    constructor(columnsDefinition, idTable, sortFnName, removeFnName) {
        //example of columnsDefinition:
        // const columns = [{'key': 'name', 'displayName':'Course Name'},
        // {'key': 'lecturer', 'displayName': 'Lecturer Name'}... ]
        this.#sortFnName = sortFnName ?? '';
        this.#removeFnName = removeFnName ?? '';
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
        const columns = this.#columnsDefinition
        .map(c => `<th onclick="${this.#getSortFn(c)}">${c.displayName}</th>`);
        if (this.#removeFnName) {
            columns.push("<th></th>");
        }
        return columns.join('');
    }
    #getSortFn(columnDefinition) {
        return this.#sortFnName ? `${this.#sortFnName}('${columnDefinition.key}')` : ''
    }
    #getBody(objects) {
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object) {
        const record =  this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`);
        if (this.#removeFnName) {

            record.push(`<td><button onclick="${this.#removeFnName}('${object.id}')">remove</button></td>`)
        }
        return record.join('');
    }
}