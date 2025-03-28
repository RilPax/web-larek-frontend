import { EventEmitter } from "./base/events"
import Modal from "./Modal"
import PostData from "./PostData"

export default class Order {
    form: HTMLFormElement
    altButtons: HTMLButtonElement[]
    errorField: HTMLElement
    submitbutton: HTMLButtonElement
    inputfield: HTMLInputElement
    events: EventEmitter
    postData: PostData

    constructor(template: HTMLTemplateElement, events: EventEmitter, postData: PostData) {
        this.form = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement
        this.errorField = this.form.querySelector('.form__errors')
        this.submitbutton = this.form.querySelector('.modal__actions button')
        this.altButtons = Array.from(this.form.querySelectorAll('.button_alt'))
        this.inputfield = this.form.querySelector('.form__input') as HTMLInputElement
        this.events = events
        this.postData = postData

        this.events.on('activeButton:toggle', (button: HTMLButtonElement) => {
            this.altButtons.forEach(button => {
                button.classList.remove('button_alt-active')
            })
            button.classList.add('button_alt-active')
            this.submitbutton.disabled = false
            this.errorField.textContent = ''
            this.postData.setPayment(button.name)
        })

        this.events.on('order:submit', (event: {form: HTMLFormElement, modal: Modal}) => {
            this.postData.setAddress(this.inputfield.value)

            if(this.postData.checkData('address') && this.postData.checkData('payment')) {
                event.modal.openModal(event.form)
                this.errorField.textContent = ''
            }

            else {
                this.submitbutton.disabled = true
                this.errorField.textContent = 'Пожалуйста, заполните форму полностью'
            }
        })

        this.inputfield.addEventListener('input', () => {
            this.submitbutton.disabled = false
            this.errorField.textContent = ''
        })
    }

    clear() {
        this.altButtons.forEach(button => {
            button.classList.remove('button_alt-active')
        })
        this.inputfield.value = ''
        this.submitbutton.disabled = true
        this.errorField.textContent = ''
    }

}