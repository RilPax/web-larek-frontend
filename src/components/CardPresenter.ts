import Icard from "../types/types"
import Card from "./Card"
import { CardModel } from "./ServerRequest"

export default class CardPresenter {    
    model: CardModel
    view: Card

    constructor(model: CardModel, view: Card)  {
        this.model = model
        this.view = view
    }

    findCardData(cardItem: HTMLElement) {
        return this.model.cards.find(card => card.title === cardItem.querySelector('.card__title').textContent)
    }

    findCard(card: HTMLElement | HTMLButtonElement, template: HTMLTemplateElement) {
        const cardData: Icard = this.findCardData(card)
        const cardElement: HTMLElement = this.renderCard(template, cardData)

        return cardElement
    }

    renderCard(template: HTMLTemplateElement, cardData: Icard): HTMLElement {
        const cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;

        this.view.setCardTitle(cardElement, cardData.title);
        this.view.setCardPrice(cardElement, cardData.price);
        if(!cardElement.classList.contains('card_compact')) {
            this.view.setCardCategory(cardElement, cardData.category)
            this.view.setCardImage(cardElement, cardData.image)
            if(!cardElement.classList.contains('gallery__item')) {
                const button: HTMLButtonElement = cardElement.querySelector('.button')
                this.view.setCardText(cardElement, cardData.description)
                if(cardData.price === null) {
                    button.disabled = true
                }
            }
        }
        return cardElement;
    }

    disableCardButton(card: HTMLElement) {
        card.classList.add('disabled')
    }

    enableCardButton(card: HTMLElement) {
        console.log(card)
        card.classList.remove('disabled')
    }

    

}