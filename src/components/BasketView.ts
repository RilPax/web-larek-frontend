import { EventEmitter } from "./base/events"
import BasketModel from "./BasketModel"
import { CardModel } from "./CardModel"
import Modal from "./Modal"
import PostData from "./PostData"

export default class BasketView {
    basket: HTMLElement
    basketContainer: HTMLElement
    basketButton: HTMLButtonElement
    basketPrice: HTMLElement
    events: EventEmitter

    constructor(basketTemplate: HTMLTemplateElement, event: EventEmitter) {
        const basket: HTMLElement = basketTemplate.content.querySelector('.basket')

        this.basket = basket
        this.basketContainer = this.basket.querySelector('.basket__list')
        this.basketButton = this.basket.querySelector('.button')
        this.basketPrice = this.basket.querySelector('.basket__price')
        this.events = event

        this.events.on('basket:render', (basketData: BasketModel) => {
            if(basketData.basketList.length === 0) {
                this.basketButton.disabled = true
            }
            else{
                this.basketButton.disabled = false
            }

            this.basketContainer.innerHTML = ''
            for(let i = 0; i < basketData.basketList.length; i++) {
                const basketElement = basketData.basketList[i]
                basketElement.querySelector('.basket__item-index').textContent = String(i + 1)
            }
            basketData.basketList.forEach(element => {
               this.addProduct(element, basketData) 
            });

            this.basketPrice.textContent = String(basketData.setTotal() + ' синапсов')
        })

        this.events.on('basket:submit', (event: {form: HTMLFormElement, postData: PostData, modal: Modal, basketData: BasketModel, cardModel: CardModel}) => {
            event.modal.openModal(event.form)
            event.postData.setItems(event.basketData.cardsId)
            event.postData.setTotal(event.basketData.totalPrice)
        }) 
    }



    addProduct(element: HTMLElement, basketData: BasketModel) {
        basketData.setTotal()
        this.basketContainer.append(element)
    }
}