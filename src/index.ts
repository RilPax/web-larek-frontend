import './scss/styles.scss';
import { API_URL } from './utils/constants';

import { Api } from './components/base/api';
import { CardModel } from './components/CardModel';
import CardView from './components/CardView';
import Gallery from './components/Gallery';
import { CustomRequest } from './types/types';
import { EventEmitter } from './components/base/events';
import Modal from './components/Modal';
import BasketData from './components/BasketModel';
import HeaderBasketButton from './components/HeaderBasketButton';
import BasketView from './components/BasketView';
import Order from './components/Order';
import PostData from './components/PostData';
import Contacts from './components/Contacts';
import Success from './components/Success';

const galleryCardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement
const modalCardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement
const softCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement
const API_URI = '/product'

const api = new Api(API_URL)

async function name() {
    const data = await api.get<CustomRequest>(API_URI)
    return data.items
}

const headerBasketButton = new HeaderBasketButton(document.querySelector('.header__basket'))
const event = new EventEmitter()
const basketData = new BasketData()
const basketView = new BasketView(document.querySelector('#basket'), event)
const postData = new PostData()
const cardModel = new CardModel(name())
const cardView = new CardView(galleryCardTemplate, modalCardTemplate, softCardTemplate, event)
const gallery = new Gallery(document.querySelector('.gallery'))
const order = new Order(document.querySelector('#order'), event, postData)
const contacts = new Contacts(document.querySelector('#contacts'), event, postData)
const success = new Success(document.querySelector('#success'))
const modal = new Modal(document.querySelector('.modal'), postData, order, contacts)

function clearSite(modalCardButtonArray: HTMLButtonElement[]) {
    postData.clearData()
    basketData.clear()
    headerBasketButton.updateCounter(basketData.productsCount)
    modalCardButtonArray.forEach(button => {
        button.disabled = false
    })
}

async function siteInit() {
    await cardModel.fetchRequest()
    const modalCardButtonArray: HTMLButtonElement[] = []

    cardModel.cards.forEach(card => {
        const softCard = cardView.renderSoftCard(card)
        const modalCard = cardView.renderModalCard(card)
        const modalButton = modalCard.querySelector('.button') as HTMLButtonElement
        modalCardButtonArray.push(modalButton)
        const galleryCard = cardView.renderGalleryCard(card)


        galleryCard.addEventListener('click', () => {
            cardView.events.emit('galleryCard:click', {modal: modal, card: modalCard} )
        })

        modalCard.addEventListener('click', (evt) => {
            const target = evt.target

            if(target === modalButton) {
                cardView.events.emit('modalCard:click', ( {card, modal, basketData, headerBasketButton, softCard} ))
                modalButton.disabled = true
            }
        })

        softCard.addEventListener('click', (evt) => {
            const target = evt.target
            if(target === softCard.querySelector('.card__button')) {
                basketData.remove(softCard)
                headerBasketButton.updateCounter(basketData.productsCount)
                basketView.events.emit('basket:render', basketData)
                modalButton.disabled = false
            }
        })

        gallery.pushCard(galleryCard)
    })

    contacts.form.addEventListener('submit', (evt) => {
        evt.preventDefault()
        contacts.events.emit('contacts:submit', ( {postData, api, modalCardButtonArray, modal, success, clearSite} ))
    })

    success.button.addEventListener('click', () => {
        modal.closeModal()
    })
}

headerBasketButton.basketButton.addEventListener('click', () => {
    modal.openModal(basketView.basket)
    basketView.events.emit('basket:render', basketData)
})

basketView.basketButton.addEventListener('click', () => {
    basketView.events.emit('basket:submit', ( {form: order.form, postData: postData, modal: modal, basketData: basketData, cardModel: cardModel} ))
})

order.altButtons.forEach(button => {
    button.addEventListener('click', () => {
        order.events.emit('activeButton:toggle', button)
    })
})

order.form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    order.events.emit('order:submit', ( {form: contacts.form, modal} ))
})

siteInit()