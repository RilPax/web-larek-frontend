import { Api } from "./base/api"
import { EventEmitter } from "./base/events"
import PostData from "./PostData"
import Modal from "./Modal"
import Success from "./Success"

const API_URI_POST = '/order'

export default class Contacts {
    form: HTMLElement
    errorField: HTMLElement
    submitbutton: HTMLButtonElement
    inputsArray: HTMLInputElement[]
    events: EventEmitter
    postData: PostData

    constructor(template: HTMLTemplateElement, events: EventEmitter, postData: PostData) {
        this.form = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement
        this.errorField = this.form.querySelector('.form__errors')
        this.submitbutton = this.form.querySelector('.modal__actions button')
        this.inputsArray = Array.from(this.form.querySelectorAll('.form__input'))
        this.events = events
        this.postData = postData

        this.inputsArray.forEach(input => {
            input.addEventListener('input', () => {
                this.submitbutton.disabled = false
                this.errorField.textContent = ''
            })
        })

        this.events.on('contacts:submit', async (event: { api: Api, modalCardButtonArray: HTMLButtonElement[], modal: Modal, success: Success, clearSite: (array: HTMLButtonElement[]) => void }) => {
            this.postData.setEmail(this.emailValue)
            this.postData.setPhone(this.PhoneValue)

            if(this.postData.checkData('email') && this.postData.checkData('phone')) {
                const request = await event.api.post(API_URI_POST, this.postData.data, 'POST')
                if(request) {
                    event.modal.openModal(event.success.success)
                    event.success.count.textContent = 'Списанно ' + this.postData.postData.total + ' синапсов'
                    event.clearSite(event.modalCardButtonArray)
                }
            }
            else {
                this.submitbutton.disabled = true
                this.errorField.textContent = 'Пожалуйста, заполните форму полностью'
            }
        })

    }

    get PhoneValue():string {
        return (this.form.querySelector('input[name="phone"]') as HTMLInputElement).value
    }
    get emailValue(): string {
        return (this.form.querySelector('input[name="email"]') as HTMLInputElement).value
    }

    clear() {
        this.inputsArray.forEach(input => {
            input.value = ''
        })
        this.submitbutton.disabled = true
        this.errorField.textContent = ''
    }
    
}