import Icard from "../types/types"

export class CardModel {
    promise: Promise<Icard[]>
    cards: Icard[]

    constructor(promise: Promise<Icard[]>) {
        this.promise = promise
    }

    async fetchRequest() {
        this.cards = await this.promise
        return this.cards
    }

    getCard(title: string) {
        return this.cards.find(card => card.title === title)
    }

    getId(title: string): string {
        const card = this.cards.find(card => card.title === title)
        return card.id
    }
}