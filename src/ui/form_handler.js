export default class FormHandler {
    #formElement
    #alertElement
    #inputElements
    constructor(idForm, idAlert) {
        this.#formElement = document.getElementById(idForm);
        this.#alertElement = document.getElementById(idAlert);
        this.#inputElements = document.querySelectorAll(`#${idForm} [name]`);
    }
    addHandler(fnProcessor) {
        this.#formElement.addEventListener('submit', event => {
            event.preventDefault();
            const data = Array.from(this.#inputElements)
            .reduce((obj, element) => {
                obj[element.name] = element.value;
                return obj;
            }, {})
            const message = fnProcessor(data);
            if (!message) {
                this.#formElement.reset(); //everything ok
                this.#alertElement.innerHTML = '';
            } else {
                const alert = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> ${message}.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
            this.#alertElement.innerHTML = alert;
            }
        })
    }
}