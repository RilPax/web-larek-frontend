import Cards from "./Cards"
import Modal from "./Modal"

export default class Gallery {

    gallery: HTMLElement

    constructor(gallery: HTMLElement) {
        this.gallery = gallery
    }

    pushCards(cards: Cards, modal: Modal) {
        cards.galleryCardsElements.forEach(card => {
            this.gallery.append(card)
            card.addEventListener('click', () => {
                cards.modalCardsElements.find(modalCard => {
                    if(modalCard.querySelector('.card__title').textContent === card.querySelector('.card__title').textContent) {
                        modal.openModal(modalCard)
                        
                    }
                })
            })
        })
    }

}