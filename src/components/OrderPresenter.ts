import { EventEmitter } from "./base/events";
import Order from "./Order";
import PostData from "./PostData";

export default class OrderPresenter {
  constructor(private view: Order, private events: EventEmitter, private postData: PostData) {
    this.events.on(`order:input`, () => {
      this.postData.setAddress(this.view.inputField.value)
    })
    this.view.altButtons.forEach(button => {
      this.events.on(`${button.name}alt:click`, () => {
        this.view.activeAltButton(button.name)
        this.view.activeSbmtBtn()
        this.postData.setPayment(button.name)
      })
    })
    this.events.on('order:submit', (options: {method: (form: HTMLFormElement) => void, form: HTMLFormElement}) => {
        const payment = this.postData.checkData('payment')
        const adress = this.postData.checkData('address')
        if(!adress || !payment) {
            this.setError(this.view.errorField)
            this.view.submitButton.disabled = true
            return
        }
        else {
            options.method(options.form)
        }
    })
  }

  formInit(option: {method: (form: HTMLFormElement) => void, form: HTMLFormElement}) {
    this.setInputListener()
    this.setButtonsListener()
    this.setFormListener({method: option.method, form: option.form})
  }

  setInputListener() {
    this.view.inputField.addEventListener('input', () => {
      this.view.activeSbmtBtn()
      this.view.errorField.textContent = ''
      this.events.emit(`order:input`)
    })
  }

  setButtonsListener() {
    this.view.altButtons.forEach(button => {
        button.addEventListener('click', () => {
            this.view.errorField.textContent = ''
            this.events.emit(`${button.name}alt:click`)
        })
    });
  }

  setFormListener(option: {method: (form: HTMLFormElement) => void, form: HTMLFormElement}) {
    this.view.form.addEventListener('submit', (evt) => {
        evt.preventDefault()
        this.events.emit('order:submit', {method: option.method, form: option.form})
    })
  }

  setError(field: HTMLElement) {
    field.textContent = 'Пожалуйста, заполните форму'
  }

}