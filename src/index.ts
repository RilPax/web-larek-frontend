import './scss/styles.scss';

import { Api } from './components/base/api';
import { API_URL } from './utils/constants';
import { CustomRequest } from "../src/types/types";
import Card from './components/Card';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import Icard from './types/types';
import PostData from './components/PostData';
import { CardModel } from './components/ServerRequest';
import Basket from './components/Basket';
import HeaderBasketButton from './components/HeaderBasketButton';
import CardPresenter from './components/CardPresenter';
import { EventEmitter } from './components/base/events';
import AppPresenter from './components/AppPresenter';
import Order from './components/Order';
import Contacts from "./components/Contacts";
import Success from './components/Success';

const URI_GET = '/product';
const URI_POST = '/order';

const cardTemplate: {
    gallery: HTMLTemplateElement, 
    modal: HTMLTemplateElement, 
    soft: HTMLTemplateElement} = {
    gallery: document.querySelector('#card-catalog'),
    modal: document.querySelector('#card-preview'),
    soft: document.querySelector('#card-basket')
}
const event = new EventEmitter()
const api = new Api(API_URL);
const card = new Card(cardTemplate.gallery, cardTemplate.modal, cardTemplate.soft)
const cardModel = new CardModel(cardsGet())
const gallery = new Gallery(document.querySelector('.gallery'))
const modal = new Modal(document.querySelector('.modal'))
const basket = new Basket(document.querySelector('#basket'))
const headerBasketButton = new HeaderBasketButton(document.querySelector('.header__basket'))
const postData = new PostData()
const order = new Order(document.querySelector('#order'))
const contacts = new Contacts(document.querySelector('#contacts'))
const success = new Success(document.querySelector('#success'))
const cardPresenter = new CardPresenter(cardModel, card)
const appPresenter = new AppPresenter(cardPresenter, modal, event, basket, gallery, headerBasketButton, postData, order, contacts, api, URI_POST, success)


async function cardsGet(): Promise<Icard[]> {
    const data = await api.get<CustomRequest>(URI_GET); 
    return data.items; 
}

async function renderSite() {
    await cardModel.fetchRequest()
    
    appPresenter.init()

}
renderSite()

