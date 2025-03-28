import Icard from "../types/types";
import { CDN_URL } from "../utils/constants";
import { EventEmitter } from "./base/events";
import BasketData from "./BasketModel";
import BasketView from "./BasketView";
import Contacts from "./Contacts";
import HeaderBasketButton from "./HeaderBasketButton";
import Modal from "./Modal";
import Order from "./Order";

export default class CardView {

    galleryCardtemplate: HTMLTemplateElement
    modalCardTemplate: HTMLTemplateElement
    softCardTemplate: HTMLTemplateElement
    events: EventEmitter
    modalCardListener: Function

    constructor(
        galleryCardtemplate: HTMLTemplateElement,
        modalCardTemplate: HTMLTemplateElement,
        softCardTemplate: HTMLTemplateElement,
        event: EventEmitter
    ) { 
        this.galleryCardtemplate = galleryCardtemplate
        this.modalCardTemplate = modalCardTemplate
        this.softCardTemplate = softCardTemplate
        this.events = event

        this.events.on('galleryCard:click', (event: {modal: Modal, card: HTMLElement}) => {
            event.modal.openModal(event.card)
        })
        this.events.on('modalCard:click', (event: {card: Icard, modal: Modal, basketData: BasketData, headerBasketButton: HeaderBasketButton, softCard: HTMLElement, order: Order, contacts: Contacts}) => {
            event.modal.closeModal()
            event.basketData.setElement(event.softCard, event.card)
            event.headerBasketButton.updateCounter(event.basketData.productsCount)
            
        })
    }

    setCardTitle(card: HTMLElement, title: string) {
        card.querySelector('.card__title').textContent = title;
    }

    setCardText(card: HTMLElement, text: string) {
        card.querySelector('.card__text').textContent = text;
    }

    setCardPrice(card: HTMLElement, price: number) {
        card.querySelector('.card__price').textContent = price !== null ? `${price} синапсов` : 'Бесценно';
    }

    setCardCategory(card: HTMLElement, category: string) {
        const categoryClass = 'card__category';
        const cardCategory = card.querySelector(`.${categoryClass}`) as HTMLElement;
        cardCategory.textContent = category;
        const categoryMap: { [key: string]: string } = {
            'софт-скил': 'soft',
            'другое': 'other',
            'дополнительное': 'additional',
            'кнопка': 'button'
        };
        cardCategory.classList.add(`${categoryClass}_${categoryMap[category] || 'hard'}`);
    }

    setCardImage(card: HTMLElement, image: string) {
        (card.querySelector('.card__image') as HTMLImageElement).src = CDN_URL + image;
        (card.querySelector('.card__image') as HTMLImageElement).alt = 'картинка товара';
    }

    renderGalleryCard(card: Icard) {
        const galleryCard = this.galleryCardtemplate.content.querySelector('.card').cloneNode(true) as HTMLButtonElement
        this.setCardCategory(galleryCard, card.category)
        this.setCardPrice(galleryCard, card.price)
        this.setCardTitle(galleryCard, card.title)
        this.setCardImage(galleryCard, card.image)

        return galleryCard
    }

    renderModalCard(card: Icard) {
        const modalCard = this.modalCardTemplate.content.querySelector('.card').cloneNode(true) as HTMLElement
        const modalButton = modalCard.querySelector('.button') as HTMLButtonElement
        this.setCardCategory(modalCard, card.category)
        this.setCardPrice(modalCard, card.price)
        this.setCardTitle(modalCard, card.title)
        this.setCardImage(modalCard, card.image)
        this.setCardText(modalCard, card.description)

        if(card.price === null) {
            modalButton.disabled = true
        }

        return modalCard
    }

    renderSoftCard(card: Icard) {
        const softCard = this.softCardTemplate.content.querySelector('.card').cloneNode(true) as HTMLElement
        this.setCardPrice(softCard, card.price)
        this.setCardTitle(softCard, card.title)



        return softCard
    }

}
