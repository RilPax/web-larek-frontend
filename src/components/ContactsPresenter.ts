import { Api } from "./base/api";
import { EventEmitter } from "./base/events";
import BasketModel from "./BasketModel";
import Contacts from "./Contacts";
import HeaderBasketButton from "./HeaderBasketButton";
import Modal from "./Modal";
import PostData from "./PostData";
import Success from "./Success";

export default class ContactsPresenter {
    constructor(private view: Contacts, private events: EventEmitter, private postData: PostData, api: Api, modal: Modal, success: Success, basketModel: BasketModel, headerBasketBtn: HeaderBasketButton ) {
        this.view.inputsArray.forEach(input => {
            this.events.on(`contacts${input.name}:input`, () => {
                if(input.name === 'email') {
                    this.postData.setEmail(input.value)
                }
                else {
                    this.postData.setPhone(input.value)
                }
                this.view.activeSbmtBtn()
            })
        })
        this.events.on('contacts:submit', () => {
            const phone = this.postData.checkData('phone')
            const email = this.postData.checkData('email')
            if(!phone || !email) {
                this.view.errorField.textContent = 'Пожалуйста, заполните форму'
                this.view.submitButton.disabled = true
            }
            else {
                this.post(api, modal, success, basketModel, headerBasketBtn)
            }
        }) 
    }

    async post(api: Api, modal: Modal, success: Success, basketModel: BasketModel, headerBasketBtn: HeaderBasketButton) {
        const request = await api.post('/order', this.postData.postData, 'POST')
        if(request) {
            modal.open(success.success)
            success.total.textContent = `Списано ${this.postData.postData.total} синапсов`
            this.postData.clearData()
            basketModel.clear()
            headerBasketBtn.updateCounter(basketModel.productsCount)
        }
    }

    formInit() {
        this.setInputsListeners()
        this.setFormListener()
    }

    setInputsListeners() {
        this.view.inputsArray.forEach(input => {
            input.addEventListener('input', () => {
                this.events.emit(`contacts${input.name}:input`)
            })
        })
    }

    setFormListener() {
        this.view.form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.events.emit('contacts:submit')
        })
    }
}