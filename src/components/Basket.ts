export default class Basket {
    basket: HTMLElement
    basketContainer: HTMLElement
    basketCard: HTMLElement
    basketButton: HTMLButtonElement
    price: number = 0

    constructor(basketTemplate: HTMLTemplateElement) {
        const basket: HTMLElement = basketTemplate.content.querySelector('.basket')

        this.basket = basket
        this.basketContainer = this.basket.querySelector('.basket__list')
        this.basketButton = this.basket.querySelector('.button')
    }

    setProductIndex() {
        for(let i = 0; i < this.productList.length; i++) {
            this.productList[i].querySelector('.basket__item-index').textContent = String(i + 1)
        }
    }

    clearBasket() {
        this.basketContainer.innerHTML = ''
    }

    addProduct(element: HTMLElement) {
        this.basketContainer.append(element)
        this.setProductIndex()
        this.setTotal()
    }

    removeProduct(element: HTMLElement) {
        this.basketContainer.removeChild(element)
        this.setProductIndex()
        this.setTotal()
    }

    setTotal() {
        const basketItems: HTMLElement[] = Array.from(this.basketContainer.querySelectorAll('.card__price'))
        let price: number = 0

        basketItems.forEach(item => {
            const findPrice = Number(item.textContent.replace(' синапсов', ''))
            price = price + findPrice
            this.price = this.price + findPrice
        })

        this.basket.querySelector('.basket__price').textContent = String(price + ' синапсов')
    }

    get totalProducts(): number {
        return Array.from(this.basketContainer.querySelectorAll('.card')).length
    }

    checkFullness() {
        if(this.productList.length === 0) {
            this.basketButton.disabled = true
        }
        else{
            this.basketButton.disabled = false
        }
    }

    get productList(): HTMLElement[] {
        return Array.from(this.basket.querySelectorAll('.card'))
    }
}