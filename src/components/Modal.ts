export default class Modal {
    modal: HTMLElement
    modalContainer: HTMLElement 
    setCloseButtonListenerBind: () => void

    constructor(modal: HTMLElement) {
        this.modal = modal
        this.modal.style.position = 'fixed'
        this.modalContainer = this.modal.querySelector('.modal__content')
        this.setCloseButtonListenerBind = this.setCloseButtonListener.bind(this)
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