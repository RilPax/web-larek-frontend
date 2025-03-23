import Icard from "../types/types";
import { EventEmitter } from "./base/events";
import Basket from "./Basket";
import Card from "./Card";
import CardPresenter from "./CardPresenter";
import Gallery from "./Gallery";
import HeaderBasketButton from "./HeaderBasketButton";
import Modal from "./Modal";
import PostData from "./PostData";
import Order from "./Order";
import Contacts from "./Contacts";
import { Api } from "./base/api";
import { CDN_URL } from "../utils/constants";
import Success from "./Success";


export default class AppPresenter {
    cardPresenter: CardPresenter;
    modal: Modal;
    event: EventEmitter;
    basketView: Basket;
    gallery: Gallery
    headerBasket: HeaderBasketButton
    postData: PostData
    order: Order
    contacts: Contacts
    api: Api
    success: Success

    modalCards: HTMLElement[] = []

    constructor(cardPresenter: CardPresenter,modal: Modal, event: EventEmitter, basket: Basket, gallery: Gallery, headerBasket: HeaderBasketButton, postData: PostData, order: Order, contacts: Contacts, api: Api, URI_POST: string, success: Success) {
        this.cardPresenter = cardPresenter;
        this.modal = modal;
        this.event = event;
        this.basketView = basket
        this.gallery = gallery
        this.headerBasket = headerBasket
        this.postData = postData
        this.order = order
        this.contacts = contacts
        this.api = api
        this.success = success

        this.event.on('modalCard:open', (options: { modalCard: HTMLElement, softCard: HTMLElement }) => {
            const modalCard = options.modalCard;
            this.modal.openModal(modalCard);
        });

        this.event.on('basket:open', (content: HTMLElement) => {
            this.modal.openModal(content)
            this.basketView.checkFullness()
        })
        this.event.on('modal:close', () => {
            this.modal.closeModal();
            this.postData.clearData()
        });
        this.event.on('basket:delete', (options: { target: EventTarget, softCard: HTMLElement, modalCard: HTMLElement, }) => {
            const modalCard = options.modalCard;
            const softCard = options.softCard;
            const softButton = softCard.querySelector('.card__button');
            const target = options.target;
            if (target === softButton) {
                if (this.basketView.basket.contains(softCard)) {
                    this.basketView.removeProduct(softCard);
                    this.basketView.setProductIndex();
                } else {
                    console.warn("Попытка удалить элемент, который не является дочерним:", softCard);
                }
                
                this.basketView.checkFullness();
                this.headerBasket.updateCounter(this.basketView.totalProducts);
        
                const modalButton = modalCard.querySelector('.card__button') as HTMLButtonElement;
                this.enableButton(modalButton)}
        });
        this.event.on('basket:add', (options: { softCard: HTMLElement, modalButton: HTMLButtonElement}) => {
            this.basketView.addProduct(options.softCard)
            this.headerBasket.updateCounter(this.basketView.totalProducts)
            this.modal.closeModal()
            this.disableButton(options.modalButton)
        })
        
        this.event.on('post:basket', () => {
            const cardsId: string[] = []
            this.basketView.productList.forEach(product => {
                const productTitle = product.querySelector('.card__title').textContent
                const cardData = this.cardPresenter.model.cards.find(card => productTitle === card.title)
                cardsId.push(cardData.id)
            })
            this.postData.setItems(cardsId)
            this.postData.setTotal(String(this.basketView.price))
            this.modal.openModal(order.form)
            this.event.emit('form:clear', (order.form))
        })
        this.event.on('form:clear', (form: HTMLFormElement) => {
            const inputArray: HTMLInputElement[] = Array.from(form.querySelectorAll('.form__input'))
            inputArray.forEach(input => {
                input.value = ''
            })
            const formButtom = form.querySelector('.modal__actions button') as HTMLButtonElement
            formButtom.disabled = true
            if(form.name === 'order') {
                this.order.altButtons.forEach(button => {
                    button.classList.remove('button_alt-active')
                })
            }
        })
        this.event.on('altButtons:setLiseners', (array: HTMLButtonElement[]) => {
            array.forEach(button => {
                button.addEventListener('click', (evt) => {
                    const target = evt.target
                    this.order.altButtons.find(button => button !== target).classList.remove('button_alt-active')
                    this.order.altButtons.find(button => button === target).classList.add('button_alt-active')
                    this.order.setActiveButton(target as HTMLButtonElement)
                    this.order.submitbutton.disabled = false
                    this.postData.hideError(this.order.errorField)
                })
            })
        })
        this.event.on('order:checkValidation', () => {
            if(!this.postData.checkData('address') || !this.postData.checkData('payment')) {
                this.postData.setError(this.order.errorField)
                this.disableButton(this.order.submitbutton)
            }
            else{
                this.postData.hideError(this.order.errorField)
                this.enableButton(this.order.submitbutton)
                this.modal.openModal(this.contacts.form)
            }
        }) 
        this.event.on('inputs:setListeners', (options: {inputArray: HTMLInputElement[], button:HTMLButtonElement, field: HTMLElement}) => {
            options.inputArray.forEach(input => {
                input.addEventListener('input', () => {
                    this.enableButton(options.button)
                    this.postData.hideError(options.field)
                })
            })
        })
        this.event.on('contacts:checkValidation', () => {
            if(this.contacts.PhoneValue === '' || this.contacts.emailValue === '') {
                this.postData.setError(this.contacts.errorField)
                this.disableButton(this.contacts.submitbutton)
            }
            else{
                this.postData.hideError(this.contacts.errorField)
                this.enableButton(this.contacts.submitbutton)
            }
        })
        this.event.on('api:post', async () => {
            const response = await this.api.post(URI_POST, this.postData.data, 'POST')

            if(response) {
                this.modal.openModal(this.success.success)
                this.success.count.textContent = String('Списано ' + this.postData.data.total + 'синапсов')
            }
        })
        this.event.on('programm:end', () => {
            this.modal.closeModal()
            this.postData.clearData()
            this.basketView.clearBasket()
            this.headerBasket.updateCounter(this.basketView.totalProducts)
            this.modalCards.forEach(card => {
                const button: HTMLButtonElement = card.querySelector('.button')
                this.enableButton(button)
            })
        })
    }


    createCard(template: HTMLTemplateElement, card: Icard) {
        return this.cardPresenter.renderCard(template, card)
    }

    
    enableButton(button: HTMLButtonElement) {
        button.disabled = false
    }

    disableButton(button: HTMLButtonElement) {
        button.disabled = true
    }

    init() {
        this.cardPresenter.model.cards.forEach(card => {
            const galleryCard = this.createCard(this.cardPresenter.view.galleryCardtemplate, card)
            const modalCard =  this.createCard(this.cardPresenter.view.modalCardTemplate, card)

            this.modalCards.push(modalCard)

            const softCard = this.createCard(this.cardPresenter.view.softCardTemplate, card)

            const modalButton = modalCard.querySelector('.button')

            this.gallery.pushCard(galleryCard)
            galleryCard.addEventListener('click', () => {
                this.event.emit('modalCard:open', {modalCard, softCard})
            })
            
            modalButton.addEventListener('click', () => {
                this.event.emit('basket:add', {softCard, modalButton, modalCard})
            })
            softCard.addEventListener('click', (evt) => {
                this.event.emit('basket:delete', {target: evt.target, softCard, modalCard})
            })
        })
        this.headerBasket.basketButton.addEventListener('click', () => {
            this.event.emit('basket:open', this.basketView.basket)
        })
        this.basketView.basketButton.addEventListener('click', () => {
            this.event.emit('post:basket')
        })
        this.event.emit('inputs:setListeners', ({inputArray: Array.from(this.order.form.querySelectorAll('.form__input')), button: this.order.submitbutton, field: this.order.errorField}))
        this.event.emit('inputs:setListeners', ({inputArray: Array.from(this.contacts.form.querySelectorAll('.form__input')), button: this.contacts.submitbutton, field: this.contacts.errorField}))
        this.order.form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            if(this.order.activeButton !== undefined) {
                this.postData.setPayment(this.order.activeButton.name)
                this.postData.setAddress(this.order.inputValue)
                this.event.emit('order:checkValidation')
            }
            else {
                this.disableButton(this.order.submitbutton)
                this.postData.setError(this.order.errorField)
            }

        })
        this.contacts.form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.postData.setPhone(this.contacts.PhoneValue)
            this.postData.setEmail(this.contacts.emailValue)
            this.event.emit('contacts:checkValidation')
            this.event.emit('api:post')
        })
        this.event.emit('altButtons:setLiseners', (this.order.altButtons))
        this.success.success.querySelector('.button').addEventListener('click', () => {
            this.event.emit('programm:end')
        })
    }
}