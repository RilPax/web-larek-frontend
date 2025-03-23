export default class Order {
    form: HTMLFormElement
    activeButton: HTMLButtonElement | undefined
    altButtons: HTMLButtonElement[]
    errorField: HTMLElement
    submitbutton: HTMLButtonElement

    constructor(template: HTMLTemplateElement) {
        this.form = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement
        this.errorField = this.form.querySelector('.form__errors')
        this.submitbutton = this.form.querySelector('.modal__actions button')
        this.altButtons = Array.from(this.form.querySelectorAll('.button_alt'))
    }

    get buttonActive():HTMLButtonElement {
        return this.activeButton
    }

    get inputValue():string {
        return (this.form.querySelector('.form__input') as HTMLInputElement).value
    }

    setActiveButton(button: HTMLButtonElement) {
        this.activeButton = button
    }

    removeActiveButton() {
        this.activeButton = undefined
    }
}