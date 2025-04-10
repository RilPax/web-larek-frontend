import Icard from "../types/types"

export default class BasketModel {
    basketList: Icard[] = []
    totalPrice: number = 0
    cardsId: string[] = []

    setElement(card: Icard) {
        this.basketList.push(card)
    }

    removeItem(card: Icard) {
        this.basketList = this.basketList.filter(item => item !== card)
    }

    get productsCount() {
        return Array.from(this.basketList).length
    }

    setTotal() {
        let price = 0

        this.basketList.forEach(card => {
            const elementPrice = card.price

            price += elementPrice
        })

        return price
    }

    clear() {
        this.basketList = []
        this.totalPrice = 0
        this.cardsId = []
    }

}