import { EventEmitter } from "./base/events";
import BasketModel from "./BasketModel";
import basketView from "./BasketView";
import CardView from "./CardView";
import HeaderBasketButton from "./HeaderBasketButton";
import Modal from "./Modal";
import PostData from "./PostData";

export default class BasketPresenter {
    constructor(private model: BasketModel, private view: basketView, private headerBasketButton: HeaderBasketButton, private events: EventEmitter, private cardView: CardView, private modal: Modal, private postData: PostData, form: HTMLFormElement) {
        this.events.on('headerBasketBtn:click', () => {
            this.modal.open(this.view.basket)
            this.view.render(this.model.basketList, this.cardView.renderSoftCard.bind(this.cardView))
        })
        this.events.on('basket:submit', () => {
            this.postData.setTotal(this.model.basketList)
            this.postData.setItems(this.model.basketList)
            this.modal.open(form)
        })
    }

    basketInit() {
    this.setHeaderBsktBtnListener()
    this.setBasketListener() 
    }

    setHeaderBsktBtnListener() {
        this.headerBasketButton.basketButton.addEventListener('click', () => {
            this.events.emit('headerBasketBtn:click')
        })
    }

    setBasketListener() {
        this.view.basketBtn.addEventListener('click', () => {
            this.events.emit('basket:submit')
        })
    }
}