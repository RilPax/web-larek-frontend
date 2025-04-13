export default class HeaderBasketButton {
    basketButton: HTMLButtonElement

    constructor(element: HTMLButtonElement) {
        this.basketButton = element
    }

    updateCounter(count: number) {
        this.basketButton.querySelector('.header__basket-counter').textContent = String(count);
    }
}