import Icard from "../types/types"
import { EventEmitter } from "./base/events"

export default class basketView {
    basket: HTMLElement
    basketBtn: HTMLButtonElement
    basketList: HTMLElement
    basketTotal: HTMLElement

    constructor(template: HTMLTemplateElement) {
        this.basket = template.content.querySelector('.basket').cloneNode(true) as HTMLElement
        this.basketBtn = this.basket.querySelector('.button') as HTMLButtonElement
        this.basketList = this.basket.querySelector('.basket__list') as HTMLElement
        this.basketTotal = this.basket.querySelector('.basket__price') as HTMLElement
    }

    render(cards: Icard[], createCard: ( card: Icard ) => HTMLElement) {
        this.basketList.innerHTML = ''
        let total = 0
        cards.forEach(card => {
            total = total + card.price
            const cardElement = createCard(card)
            this.basketList.append(cardElement)
        })
        this.basketTotal.textContent = `${total} синапсов`
        if(total !== 0) {
            this.basketBtn.disabled = false
        }
        else {
            this.basketBtn.disabled = true
        }
    }
}