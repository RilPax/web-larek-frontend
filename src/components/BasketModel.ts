import Icard from "../types/types"

export default class BasketModel {
    basketList: HTMLElement[] = []
    totalPrice: number = 0
    cardsId: string[] = []

    constructor() {
        this.basketList = []
    }

    setElement(element: HTMLElement, card: Icard) {
        this.basketList.push(element)
        this.totalPrice += Number(element.querySelector('.card__price').textContent.replace(' синапсов', ''))
        this.cardsId.push(card.id)
    }

    remove(softCard: HTMLElement) {
        this.basketList = this.basketList.filter(element => element !== softCard);
        this.totalPrice -= Number(softCard.querySelector('.card__price').textContent.replace(' синапсов', ''))
    }

    getElementPrice(element: HTMLElement) {
        return element.querySelector('.card__price').textContent
    }

    get productsCount() {
        return Array.from(this.basketList).length
    }

    setTotal() {
        let price = 0

        this.basketList.forEach(element => {
            const elementPrice = element.querySelector('.card__price').textContent
            const findPrice = Number(elementPrice.replace(' синапсов', ''))

            price += findPrice
        })

        return price
    }

    clear() {
        this.basketList = []
        this.totalPrice = 0
        this.cardsId = []
    }

}