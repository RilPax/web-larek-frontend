export default class Success {
    success: HTMLElement
    total: HTMLElement
    button: HTMLButtonElement

    constructor(template: HTMLTemplateElement) {
        this.success = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement
        this.total = this.success.querySelector('.order-success__description')
        this.button = this.success.querySelector('.button')

    }
}