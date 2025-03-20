export default class Modal {
    modal: HTMLElement

    constructor(modal: HTMLElement) {
        this.modal = modal
        this.modal.style.position = 'fixed'
    }

    pushModalContent(element: HTMLElement) {
        this.modal.querySelector('.modal__content').append(element)
    }

    clearModalContent() {
        this.modal.querySelector('.modal__content').innerHTML = ''
    }
    
    setCloseButtonListener() {
        this.closeModal()
    }

    closeModal() {
        this.modal.classList.remove('modal_active')

        const closeButton = this.modal.querySelector('.modal__close');

        closeButton.removeEventListener('click', this.setCloseButtonListener.bind(this));
    }

    openModal(element: HTMLElement) {

        this.clearModalContent()
        this.pushModalContent(element)

        

        this.modal.classList.add('modal_active')
        const closeButton = this.modal.querySelector('.modal__close');

        closeButton.addEventListener('click', this.setCloseButtonListener.bind(this));
    }
}