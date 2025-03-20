import './scss/styles.scss';

import { Api } from './components/base/api';
import { API_URL } from './utils/constants';
import { CustomRequest } from "../src/types/types";
import Cards from './components/Cards';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import Basket from './components/Basket';
import Forms from './components/Forms';
import Icard from './types/types';
import PostData from './components/PostData';

const URI_GET = '/product';
const URI_POST = '/order';

const formsTemplates:HTMLTemplateElement[]  = [
    document.querySelector('#order'),
    document.querySelector('#contacts')
]

const api = new Api(API_URL);
const cards = new Cards(cardsGet())
const gallery = new Gallery(document.querySelector('.gallery'))
const modal = new Modal(document.querySelector('.modal'))
const forms = new Forms(formsTemplates)
const postData = new PostData()
const basket = new Basket(document.querySelector('#basket'), document.querySelector('.header__basket'), modal, forms, postData, cards)
const finishModal = (document.querySelector('#success') as HTMLTemplateElement).content.querySelector('.order-success') as HTMLElement


async function cardsGet(): Promise<Icard[]> {
    const data = await api.get<CustomRequest>(URI_GET); 
    return data.items; 
}

async function cardsInit() {
    await cards.createCards(basket, modal)

    gallery.pushCards(cards, modal)
}

cardsInit()

basket.addBasketButtonListener(modal)
forms.onForms(modal, postData, api, URI_POST, finishModal, basket, cards)



