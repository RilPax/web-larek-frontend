import { CustomRequest } from "../types/types";
import { Api } from "./base/api";
import { EventEmitter } from "./base/events";
import BasketModel from "./BasketModel";
import BasketView from "./BasketView";
import CardView from "./CardView";
import Contacts from "./Contacts";
import Gallery from "./Gallery";
import HeaderBasketButton from "./HeaderBasketButton";
import Modal from "./Modal";
import Order from "./Order";

export default class CardPresenter {
    constructor(private api: Api, 
        private cardView: CardView, 
        private gallery: Gallery, 
        private events: EventEmitter, 
        private modal: Modal, 
        private basketModel: BasketModel, 
        private basketView: BasketView,
        private headerBasketBtn: HeaderBasketButton,
        private order: Order,
        private contacts: Contacts) {
            this.cardsInit()
        }

    async cardsInit() {
        const data = await this.api.get<CustomRequest>('/product')
        const galleryCards:HTMLButtonElement[] = []
        data.items.forEach(card => {
            const galleryCard = this.cardView.renderGalleryCard(card)
            const modalCard = this.cardView.renderModalCard(card)
            this.events.on(`${card.title}gallery:click`, () => {
                this.modal.open(modalCard)
            })
            this.events.on(`${card.title}modal:click`, () => {
                this.basketModel.setElement(card)
                this.modal.close(this.order.clearOrder.bind(this.order), this.contacts.clearContacts.bind(this.contacts))
                this.headerBasketBtn.updateCounter(this.basketModel.productsCount)
            })
            this.events.on(`${card.title}soft:click`, () => {
                this.basketModel.removeItem(card)
                this.basketView.render(this.basketModel.basketList, this.cardView.renderSoftCard.bind(this.cardView))
                this.headerBasketBtn.updateCounter(this.basketModel.productsCount)
            })
            galleryCards.push(galleryCard)
        })
        this.gallery.push(galleryCards)
    }
}