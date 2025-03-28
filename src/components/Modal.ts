import Contacts from "./Contacts"
import Order from "./Order"
import PostData from "./PostData"

export default class Modal {
    modal: HTMLElement
    modalContainer: HTMLElement 
    postData: PostData
    setCloseButtonListenerBind: () => void
    order: Order
    contacts: Contacts

    constructor(modal: HTMLElement, postData: PostData, order: Order, contacts: Contacts) {
        this.modal = modal
        this.modal.style.position = 'fixed'
        this.modalContainer = this.modal.querySelector('.modal__content')
        this.postData = postData
        this.setCloseButtonListenerBind = this.setCloseButtonListener.bind(this)
        this.order = order
        this.contacts = contacts
    }

    pushModalContent(element: HTMLElement) {
        this.modalContainer.append(element)
    }

    clearModalContent() {
        this.modalContainer.innerHTML = ''
    }
    
    setCloseButtonListener() {
        this.closeModal()
    }

    closeModal() {
        this.modal.classList.remove('modal_active')

        const closeButton = this.modal.querySelector('.modal__close');
        this.postData.clearData()

        this.order.clear()
        this.contacts.clear()

        closeButton.removeEventListener('click', this.setCloseButtonListenerBind);
    }

    openModal(element: HTMLElement) {

        this.clearModalContent()
        this.pushModalContent(element)

        

        this.modal.classList.add('modal_active')
        const closeButton = this.modal.querySelector('.modal__close');

        closeButton.addEventListener('click', this.setCloseButtonListenerBind);
    }
}