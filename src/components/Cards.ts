import Request from "../types/types";
import { CDN_URL } from "../utils/constants";
import Basket from "./Basket";
import Modal from "./Modal";
import IDataCard from "../types/types"

export default class Cards {

    cards: Promise<Request[]>
    elements: HTMLElement[]
    galleryCardsElements: HTMLButtonElement[] = []
    modalCardsElements: HTMLElement[] = []
    softCardElements: HTMLElement[] = []
    cardsData: IDataCard[] = []

    constructor(cards: Promise<Request[]>) {
        this.cards = cards
    }

    setCardTitle(card: HTMLElement, title: string) {
        card.querySelector('.card__title').textContent = title
    }

    setCardText(card: HTMLElement, text: string) {
        card.querySelector('.card__text').textContent = text
    }

    setCardPrice(card: HTMLElement, price: number) {

        if(price !== null) {
            card.querySelector('.card__price').textContent = String(price) + ' синапсов'
        }
        else {
            card.querySelector('.card__price').textContent = 'Бесценно'
        }
    }

    setCategoryClass(category: HTMLElement, categoryClass: string, className: string) {
        category.classList.add(categoryClass + `_${className}`)
    }

    setCardCategory(card: HTMLElement, category: string) {
        const categoryClass = 'card__category'
        const cardCategory = card.querySelector(`.${categoryClass}`) as HTMLElement
        cardCategory.textContent = category

        if(category === 'софт-скил') {
            this.setCategoryClass(cardCategory, categoryClass, 'soft')
        }
        else if(category === 'другое') {
            this.setCategoryClass(cardCategory, categoryClass, 'other')
        }
        else if(category ==='дополнительное') {
            this.setCategoryClass(cardCategory, categoryClass, 'additional')
        }
        else if(category === 'кнопка') {
            this.setCategoryClass(cardCategory, categoryClass, 'button')
        }
        else {
            this.setCategoryClass(cardCategory, categoryClass, 'hard')
        }
    }

    checkPrice(card: HTMLElement) {
        const price = card.querySelector('.card__price').textContent
        const cardButton = card.querySelector('.card__button') as HTMLButtonElement

        if(price === 'Бесценно') {
            cardButton.disabled = true
        }
        else {
            cardButton.disabled = false
        }
    }

    async setCardImage(card: HTMLElement, image: string) {
        (card.querySelector('.card__image') as HTMLImageElement).src = CDN_URL + image;
        (card.querySelector('.card__image') as HTMLImageElement).alt = 'картинка товара'
    }

    async createGalleryCards(template: HTMLTemplateElement) {
        const cardElement = template.content.querySelector('.card')
        const cardsPromise = await this.cards

        cardsPromise.forEach(card => {
            const cardClone = cardElement.cloneNode(true) as HTMLButtonElement
            this.setCardTitle(cardClone, card.title)
            this.setCardPrice(cardClone, card.price)
            this.setCardCategory(cardClone, card.category)
            this.setCardImage(cardClone, card.image)
            this.galleryCardsElements.push(cardClone)
        })
    }


    setModalCardListener(card: HTMLElement, basket: Basket, modal: Modal) {
        const cardButton = card.querySelector('.card__button') as HTMLButtonElement
        cardButton.addEventListener('click', () => {
            this.softCardElements.find(softCard => {
                if(softCard.querySelector('.card__title').textContent === card.querySelector('.card__title').textContent) {
                    basket.addBasketContent(softCard)
                    cardButton.disabled = true
                    cardButton.textContent = 'В корзине'
                    modal.closeModal()
                }
            })
        })
    }

    async createModalCards(template: HTMLTemplateElement, basket: Basket, modal: Modal) {
        const cardElement = template.content.querySelector('.card')
        const cardsPromise = await this.cards

        cardsPromise.forEach(card => {
            const cardClone = cardElement.cloneNode(true) as HTMLElement
            this.setCardTitle(cardClone, card.title)
            this.setCardPrice(cardClone, card.price)
            this.setCardCategory(cardClone, card.category)
            this.setCardText(cardClone, card.description)
            this.setCardImage(cardClone, card.image)
            this.checkPrice(cardClone)
            this.modalCardsElements.push(cardClone)

            this.setModalCardListener(cardClone, basket, modal)
        })
    }

    async createSoftCards(template: HTMLTemplateElement, basket: Basket) {
        const cardElement = template.content.querySelector('.card')
        const cardsPromise = await this.cards

        cardsPromise.forEach(card => {
            const cardClone = cardElement.cloneNode(true) as HTMLElement
            this.setCardTitle(cardClone, card.title)
            this.setCardPrice(cardClone, card.price)
            this.softCardElements.push(cardClone)
            cardClone.querySelector('.basket__item-delete').addEventListener('click', () => {
                basket.removeBasketContent(cardClone)
                this.modalCardsElements.find(modalElement => {
                    if(cardClone.querySelector('.card__title').textContent === modalElement.querySelector('.card__title').textContent) {
                        const modalButton = modalElement.querySelector('.button') as HTMLButtonElement
                        modalButton.disabled = false
                        modalButton.textContent = 'В корзину'
                    }
                })
            })
        })
    }

    async createDataCards() {
        const cardsPromise = await this.cards

        cardsPromise.forEach(card => {
            const cardData = {
                id: card.id,
                title: card.title
            }
            this.cardsData.push(cardData as IDataCard)
        })
    }

    async createCards(basket: Basket, modal: Modal) {
        await(
            this.createGalleryCards(document.querySelector('#card-catalog')),
            this.createModalCards(document.querySelector('#card-preview'), basket, modal),
            this.createSoftCards(document.querySelector('#card-basket'), basket),
            this.createDataCards()
        )
    }

    get cardsArray(): Promise<Request[]> {
        return this.cards
    }

    get GalleryCards(): HTMLButtonElement[] {
        return this.galleryCardsElements
    }
}