import { EventEmitter } from "./base/events"
import Contacts from "./Contacts"
import Modal from "./Modal"
import Order from "./Order"
import PostData from "./PostData"
import Success from "./Success"

export default class AppPresenter {
    constructor(private events: EventEmitter, private modal: Modal, private order: Order, private contacts: Contacts, private postData: PostData, private success: Success) {
        this.events.on('modal:close', () => {
            this.modal.close(this.order.clearOrder.bind(this.order), this.contacts.clearContacts.bind(this.contacts))
            this.postData.clearData()
        })
        this.events.on('success:click', () => {
            this.modal.close(this.order.clearOrder.bind(this.order), this.contacts.clearContacts.bind(this.contacts))
        }) 
    }

    appInit() {
        this.setModalListeners()
        this.setSuccessListeners()
    }

    setModalListeners() {
        this.modal.closeBtn.addEventListener('click', () => {
            this.events.emit('modal:close')
        })
    }

    setSuccessListeners() {
        this.success.button.addEventListener('click', () => {
            this.events.emit('success:click')
        })
    }
}