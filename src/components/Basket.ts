import Cards from "./Cards"
import Forms from "./Forms"
import Modal from "./Modal"
import PostData from "./PostData"

export default class Basket {
    basket: HTMLElement
    basketButton: HTMLButtonElement

    constructor(template: HTMLTemplateElement, button: HTMLButtonElement, modal: Modal, forms: Forms, postData: PostData, cards: Cards) {
        this.basket = template.content.querySelector('.basket')
        this.basketButton = button

        this.basket.querySelector('.basket__button').addEventListener('click', () => {
            modal.clearModalContent()
            modal.pushModalContent(forms.orderForm)
            postData.setItems(this.getIdList(cards))
            postData.setTotal(this.TotalPrice)
            console.log(postData.data)
        })
    }

    renderBasket(modal: Modal) {
        modal.openModal(this.basket)
        this.checkBasketFullness()
    }

    getIdList(cards: Cards): string[] {
        const basketArray: HTMLElement[] = Array.from(this.basket.querySelectorAll('.card__title'))
        const idList:string[] = []
        basketArray.forEach(item => {
            cards.cardsData.forEach(object => {
                if(item.textContent === object.title) {
                    idList.push(object.id)
                }
            })
        })
        return idList
    }

    checkBasketFullness() {
        const basketButton:HTMLButtonElement = this.basket.querySelector('.basket__button') 
        if(Array.from(this.basket.querySelectorAll('.card')).length === 0) {
            basketButton.disabled = true
        }
        else {
            basketButton.disabled = false
        }
    }

    addBasketButtonListener(modal: Modal) {
        this.basketButton.addEventListener('click', this.renderBasket.bind(this, modal))
        modal.closeModal.bind(modal)
    }

    addBasketContent(element: HTMLElement) {
        this.basket.querySelector('.basket__list').append(element)
        this.changeBasketState()
    }

    removeBasketContent(element: HTMLElement) {
        this.basket.querySelector('.basket__list').removeChild(element)
        this.changeBasketState()
    }

    removeAllContent(cards: Cards) {
        this.basket.querySelector('.basket__list').innerHTML = ''
        this.changeBasketState()
        cards.modalCardsElements.forEach(card => {
            const catdButton = card.querySelector('.card__button') as HTMLButtonElement
            catdButton.disabled = false
            catdButton.textContent = 'В корзину'
        })
    }

    changeBasketState() {
        this.setBasketElementIndex()
        this.setTotalElements()
        this.setTotalPrice()
        this.checkBasketFullness()
    }

    setBasketElementIndex() {
        const basketArray = Array.from(this.basket.querySelectorAll('.card'))
        basketArray.forEach((element, index) => {
            element.querySelector('.basket__item-index').textContent = String(index + 1)
        })
    }

    get TotalPrice():string {
        const elementsArray = Array.from(this.basket.querySelectorAll('.card'));
        let total: number = 0;
        elementsArray.forEach(element => {
            let price = parseFloat(element.querySelector('.card__price').textContent.replace(/[^\d.]/g, ''));
            total += price;
        })
        return String(total)
    }

    get TotalItems():string[] {
        const itemsArray:string[] = []
        this.basket.querySelectorAll('.card__title').forEach(item => itemsArray.push(item.textContent))
        return itemsArray
    }

    setTotalPrice() {
        this.basket.querySelector('.basket__price').textContent = String(this.TotalPrice + ' синапсов')
    }

    setTotalElements() {
        const elementsArray = Array.from(this.basket.querySelectorAll('.card'))
        this.basketButton.querySelector('.header__basket-counter').textContent = String(elementsArray.length)
    }
}