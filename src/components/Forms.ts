import { Api } from "./base/api";
import Basket from "./Basket";
import Cards from "./Cards";
import Modal from "./Modal"
import PostData from "./PostData";

export default class Forms {
    forms: HTMLFormElement[] = []
    constructor(forms: HTMLTemplateElement[]) {
        forms.forEach(template => {
            const formElement = template.content.firstElementChild?.cloneNode(true) as HTMLFormElement;
            if (formElement) {
                document.body.appendChild(formElement)
                this.forms.push(formElement);
            }
        });
    }
    

    addErrorText(form: HTMLFormElement) {
        console.log(form.querySelector('.form__errors'))
        form.querySelector('.form__errors').textContent = 'Пожалуйста, заполните форму'
    }

    hideErrorText(form: HTMLFormElement) {
        form.querySelector('.form__errors').textContent = ''
    }

    enableFormButton(form: HTMLFormElement) {
        (form.querySelector('.modal__actions button') as HTMLButtonElement).disabled = false
    }

    disableFormButton(form: HTMLFormElement) {
        (form.querySelector('.modal__actions button') as HTMLButtonElement).disabled = true
    }

    validateForm(form: HTMLFormElement, isValid: boolean, buttonsArray?: HTMLButtonElement[]) {
        if(form === this.concactsForm) {
            if (isValid) {
                console.log('ok', isValid)
                this.enableFormButton(form)
            } else {
                console.log(':(',)
                this.disableFormButton(form)
            }
        }
        else if(form === this.orderForm) {
            const ActiveButton = buttonsArray?.find(button => button.classList.contains('button_alt-active'))
            if (isValid && ActiveButton) {
                console.log('ok', isValid)
                this.enableFormButton(form)
            } else {
                console.log(':(')
                this.disableFormButton(form)
            }
        }


    }

    checkFormInputs(form: HTMLFormElement) {

        const inputArray: HTMLInputElement[] = Array.from(form.querySelectorAll('.form__input'));
    
        inputArray.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value === '') {
                    this.addErrorText(form)
                    this.disableFormButton(form);
                } 
                else {
                    const isValid = inputArray.every(input => input.value !== '')
                    if(form.name === 'order') {
                        const buttonsArray: HTMLButtonElement[] = Array.from(form.querySelectorAll<HTMLButtonElement>('.order__buttons button'))
                        this.hideErrorText(form);
                        this.validateForm(form, isValid, buttonsArray)
                    }
                    else {
                        this.hideErrorText(form)
                        this.validateForm(form, isValid)
                    }
                }
            });
        });
    }

    toggleFormButtonsState(form: HTMLFormElement) {
        const buttonsArray: HTMLButtonElement[] = Array.from(
            form.querySelectorAll<HTMLButtonElement>('.order__buttons button')
        );
    
        buttonsArray.forEach(button => {
            button.addEventListener('click', () => {
                const inputArray: HTMLInputElement[] = Array.from(form.querySelectorAll('.form__input'))
                const isValid = inputArray.every(input => input.value !== '')
                buttonsArray.forEach(button => button.classList.remove('button_alt-active'));
    
                button.classList.add('button_alt-active')
                this.validateForm(form, isValid, buttonsArray)
            });
        });
    }

    validateContacts() {
        const contactsForm = this.concactsForm
        if (contactsForm) {
            this.checkFormInputs(contactsForm)
        }
    }
    
    validateOrder() {
        const orderForm = this.orderForm;
        if (orderForm) {
            this.checkFormInputs(orderForm)
            this.toggleFormButtonsState(orderForm)
        }
    }

    initFormValidation() {
        this.validateOrder()
        this.validateContacts()
    }

    onForms(modal: Modal, postData: PostData, api: Api, uri: string, finishModal: HTMLElement, basket: Basket, cards: Cards){
        this.initFormValidation()
        this.setSubmitEvents(modal, postData, api, uri, finishModal, basket, cards)
    }

    setSubmitEvents(modal: Modal, postData: PostData, api: Api, uri: string, finishModal: HTMLElement, basket: Basket, cards: Cards) {
        if (this.concactsForm) {
            this.concactsForm.addEventListener('submit', async (evt) => {
                evt.preventDefault()
                postData.setEmail((this.concactsForm.querySelector('input[name="email"]') as HTMLInputElement).value)
                postData.setPhone((this.concactsForm.querySelector('input[name="phone"]') as HTMLInputElement).value)
                const response = await api.post(uri, postData.data, 'POST')
                if(response) {
                    modal.clearModalContent()
                    modal.pushModalContent(finishModal)
                    finishModal.querySelector('.order-success__description').textContent = `Списано ${postData.data.total} синапсов`;
                    (finishModal.querySelector('.order-success__close') as HTMLButtonElement). addEventListener('click', () => {
                        modal.closeModal()
                        postData.clearData()
                        basket.removeAllContent(cards)
                    })
                }
                
            });
        }
        
        if (this.orderForm) {
            this.orderForm.addEventListener('submit', (evt) => {
                evt.preventDefault()
                postData.setPayment(Array.from(this.orderForm.querySelectorAll<HTMLButtonElement>('.order__buttons button')).find(button => button.classList.contains('button_alt-active')).name)
                postData.setAdress((this.orderForm.querySelector('input[name="address"]') as HTMLInputElement).value)
                console.log(postData.data)
                modal.clearModalContent()
                if (this.concactsForm) {
                    modal.pushModalContent(this.concactsForm);
                }
            });
        }
        
    }

    get orderForm(): HTMLFormElement | null {
        return this.forms.find(form => form.name === 'order') || null;
    }
    
    get concactsForm(): HTMLFormElement | null {
        return this.forms.find(form => form.name === 'contacts') || null;
    }
    
}