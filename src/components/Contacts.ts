export default class Contacts {
    form: HTMLElement
    errorField: HTMLElement
    submitbutton: HTMLButtonElement

    constructor(template: HTMLTemplateElement) {
        this.form = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement
        this.errorField = this.form.querySelector('.form__errors')
        this.submitbutton = this.form.querySelector('.modal__actions button')
    }

    get PhoneValue():string {
        return (this.form.querySelector('input[name="phone"]') as HTMLInputElement).value
    }
    get emailValue(): string {
        return (this.form.querySelector('input[name="email"]') as HTMLInputElement).value
    }
    
}