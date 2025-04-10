import Icard, { postData } from '../types/types'
import { PostDataType } from '../types/types'


export default class PostData {
    postData: postData

    constructor() {
        this.postData = {
            payment: '',
            email: '',
            phone: '',
            address: '',
            total: 0,
            items: [],
        }
    }

    setPayment(payment: string) {
        this.postData.payment = payment
    }

    setAddress(adress: string) {
        this.postData.address = adress
    }

    setEmail(email: string) {
        this.postData.email = email
    }

    setItems(cards: Icard[]) {
        this.postData.items = []
        cards.forEach(card => {
            this.postData.items.push(card.id)
        })
    }

    setTotal(cards: Icard[]) {
        let total = 0
        cards.forEach(card => {
            total += card.price
        })
        this.postData.total = total
    }

    setPhone(phone: string) {
        this.postData.phone = phone
    }

    clearData() {
        this.postData = {
            payment: '',
            email: '',
            phone: '',
            address: '',
            total: 0,
            items: [],
        }
    }

    checkData(key: keyof PostDataType): boolean {
        const value = this.postData[key];
    
        if (value === undefined || value === null || value === '' || value === 0 || (Array.isArray(value) && value.length === 0)) {
            return false;
        }
        else {
            return true;
        }
        
    }


    hideError(field: HTMLElement) {
        field.textContent = ''
    }
}