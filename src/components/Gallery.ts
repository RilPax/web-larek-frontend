
export default class Gallery {

    gallery: HTMLElement

    constructor(gallery: HTMLElement) {
        this.gallery = gallery
    }

    pushCard(card: HTMLElement) { 
        this.gallery.append(card)
    }

    getElementText(element: Element, className: string) {
        return element.querySelector(className).textContent
    }

}