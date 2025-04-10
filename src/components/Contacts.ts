import { EventEmitter } from "./base/events"

export default class Contacts {
    form: HTMLFormElement
    errorField: HTMLElement
    submitButton: HTMLButtonElement
    inputsArray: HTMLInputElement[]
    events: EventEmitter

    constructor(template: HTMLTemplateElement, events: EventEmitter) {
        this.form = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement
        this.errorField = this.form.querySelector('.form__errors')
        this.submitButton = this.form.querySelector('.modal__actions button')
        this.inputsArray = Array.from(this.form.querySelectorAll('.form__input'))
        this.events = events
    }

    get PhoneValue():string {
        return (this.form.querySelector('input[name="phone"]') as HTMLInputElement).value
    }
    get emailValue(): string {
        return (this.form.querySelector('input[name="email"]') as HTMLInputElement).value
    }

    clearContacts() {
        this.inputsArray.forEach(input => {
            input.value = ''
        })
        this.submitButton.disabled = true
        this.errorField.textContent = ''
    }

    activeSbmtBtn() {
        this.submitButton.disabled = false
    }
    
}