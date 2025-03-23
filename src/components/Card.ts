import { CDN_URL } from "../utils/constants";

export default class Card {

    galleryCardtemplate: HTMLTemplateElement
    modalCardTemplate: HTMLTemplateElement
    softCardTemplate: HTMLTemplateElement

    constructor(
        galleryCardtemplate: HTMLTemplateElement,
        modalCardTemplate: HTMLTemplateElement,
        softCardTemplate: HTMLTemplateElement
    ) { 
        this.galleryCardtemplate = galleryCardtemplate
        this.modalCardTemplate = modalCardTemplate
        this.softCardTemplate = softCardTemplate
    }

    setCardTitle(card: HTMLElement, title: string) {
        card.querySelector('.card__title')!.textContent = title;
    }

    setCardText(card: HTMLElement, text: string) {
        card.querySelector('.card__text')!.textContent = text;
    }

    setCardPrice(card: HTMLElement, price: number) {
        card.querySelector('.card__price')!.textContent = price !== null ? `${price} синапсов` : 'Бесценно';
    }

    setCardCategory(card: HTMLElement, category: string) {
        const categoryClass = 'card__category';
        const cardCategory = card.querySelector(`.${categoryClass}`) as HTMLElement;
        cardCategory.textContent = category;
        const categoryMap: { [key: string]: string } = {
            'софт-скил': 'soft',
            'другое': 'other',
            'дополнительное': 'additional',
            'кнопка': 'button'
        };
        cardCategory.classList.add(`${categoryClass}_${categoryMap[category] || 'hard'}`);
    }

    setCardImage(card: HTMLElement, image: string) {
        (card.querySelector('.card__image') as HTMLImageElement).src = CDN_URL + image;
        (card.querySelector('.card__image') as HTMLImageElement).alt = 'картинка товара';
    }

    checkPrice(card: HTMLElement) {
        const price = card.querySelector('.card__price').textContent;
        const cardButton = card.querySelector('.card__button') as HTMLButtonElement;
        cardButton.textContent = price;
    }
}
