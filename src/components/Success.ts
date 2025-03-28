export default class Success {
    success: HTMLElement
    count: HTMLElement
    button: HTMLButtonElement

    constructor(template: HTMLTemplateElement) {
        this.success = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement
        this.count = this.success.querySelector('.order-success__description')
        this.button = this.success.querySelector('.button')
    }
}