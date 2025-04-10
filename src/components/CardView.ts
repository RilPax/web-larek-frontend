import Icard from "../types/types"
import { CDN_URL } from "../utils/constants"
import { EventEmitter } from "./base/events"


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

        galleryCard.addEventListener('click', () => {
            this.events.emit(`${card.title}gallery:click`)
        })

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

        modalButton.addEventListener('click', () => {
            this.events.emit(`${card.title}modal:click`)
        })

        return modalCard
    }

    renderSoftCard(card: Icard) {
        const softCard = this.softCardTemplate.content.querySelector('.card').cloneNode(true) as HTMLElement
        this.setCardPrice(softCard, card.price)
        this.setCardTitle(softCard, card.title)

        softCard.addEventListener('click', (evt) => {
            const target = evt.target
            const deleteBtn = softCard.querySelector('.basket__item-delete') as HTMLButtonElement
            if(target === deleteBtn) {
                this.events.emit(`${card.title}soft:click`)
            }
        })

        return softCard
    }

    renderGallery(cards: Icard[]) {
        const gallery: HTMLButtonElement[] = []
        cards.forEach(card => {
            gallery.push(this.renderGalleryCard(card))
        })
        return gallery
    }

}
