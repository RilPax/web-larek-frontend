import { EventEmitter } from "./base/events"
import Modal from "./Modal"
import PostData from "./PostData"

export default class Order {
    form: HTMLFormElement
    altButtons: HTMLButtonElement[]
    errorField: HTMLElement
    submitButton: HTMLButtonElement
    inputField: HTMLInputElement
    events: EventEmitter

    constructor(template: HTMLTemplateElement, events: EventEmitter) {
        this.form = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement
        this.errorField = this.form.querySelector('.form__errors')
        this.submitButton = this.form.querySelector('.modal__actions button')
        this.altButtons = Array.from(this.form.querySelectorAll('.button_alt'))
        this.inputField = this.form.querySelector('.form__input') as HTMLInputElement
        this.events = events
    }

    clearOrder() {
        this.altButtons.forEach(button => {
            button.classList.remove('button_alt-active')
        })
        this.inputField.value = ''
        this.submitButton.disabled = true
        this.errorField.textContent = ''
    }

    activeAltButton(name: string) {
        this.altButtons.forEach(button => {
            button.classList.remove('button_alt-active')
            if(button.name === name) {
                button.classList.add('button_alt-active')
            }
        })
        
    }

    activeSbmtBtn() {
        this.submitButton.disabled = false
    }

}