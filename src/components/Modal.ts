
export default class Modal {
    modal = document.querySelector('.modal') as HTMLElement
    modalContainer = this.modal.querySelector('.modal__content') as HTMLElement
    closeBtn = this.modal.querySelector('.modal__close') as HTMLElement

    constructor() {
        this.modal.style.position = 'fixed'
    }

    open(element: HTMLElement) {
        this.clear()
        this.modalContainer.append(element)
        this.modal.classList.add('modal_active')
    }

    close(clearOrder: () => void, clearContacts: () => void) {
        this.modal.classList.remove('modal_active')
        this.clear()
        clearOrder()
        clearContacts()
    }

    clear() {
        this.modalContainer.innerHTML = ''
    }
}