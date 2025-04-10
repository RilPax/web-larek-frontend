import './scss/styles.scss';

import CardPresenter from "./components/CardPresenter";
import { Api } from "./components/base/api";
import { EventEmitter } from "./components/base/events";
import CardView from "./components/CardView";
import Gallery from "./components/Gallery";
import { API_URL } from "./utils/constants";
import Modal from './components/Modal';
import HeaderBasketButton from './components/HeaderBasketButton';
import BasketModel from './components/BasketModel';
import BasketView from './components/BasketView';
import PostData from './components/PostData';
import Order from './components/Order';
import Contacts from './components/Contacts';
import Success from './components/Success';
import OrderPresenter from './components/OrderPresenter';
import ContactsPresenter from './components/ContactsPresenter';
import AppPresenter from './components/AppPresenter';
import BasketPresenter from './components/BasketPresenter';

const galleryCardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement
const modalCardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement
const softCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement
const galleryElement = document.querySelector('.gallery') as HTMLElement
const headerBasketButtonTemplate = document.querySelector('.header__basket') as HTMLButtonElement
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement
const ordertemplate = document.querySelector('#order') as HTMLTemplateElement
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement
const succsessTemplate = document.querySelector('#success') as HTMLTemplateElement

const api = new Api(API_URL)
const event = new EventEmitter()
const cardView = new CardView(galleryCardTemplate, modalCardTemplate, softCardTemplate, event)
const gallery = new Gallery(galleryElement)
const modal = new Modal()
const headerBasketButton = new HeaderBasketButton(headerBasketButtonTemplate)
const basketModel = new BasketModel()
const basketView = new BasketView(basketTemplate)
const postData = new PostData()
const order = new Order(ordertemplate, event)
const contacts = new Contacts(contactsTemplate, event)
const success = new Success(succsessTemplate)

const orderPresenter = new OrderPresenter(order, event, postData)
const contactsPresenter = new ContactsPresenter(contacts, event, postData, api, modal, success, basketModel, headerBasketButton)
const cardPresenter = new CardPresenter(api, cardView, gallery, event, modal, basketModel, basketView, headerBasketButton, order, contacts)
const appPresenter = new AppPresenter(event, modal, order, contacts, postData, success)
const basketPresenter = new BasketPresenter(basketModel, basketView, headerBasketButton, event, cardView, modal, postData, order.form)


orderPresenter.formInit({method: modal.open.bind(modal), form: contacts.form})
contactsPresenter.formInit()
appPresenter.appInit()
basketPresenter.basketInit()
