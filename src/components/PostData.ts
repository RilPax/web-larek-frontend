import { postData } from '../types/types'

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

    setAdress(adress: string) {
        this.postData.address = adress
    }

    setEmail(email: string) {
        this.postData.email = email
    }

    setItems(items: string[]) {
        this.postData.items = items
    }

    setTotal(total: string) {
        this.postData.total = Number(total)
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
    get data(): postData {
        return this.postData
    }
}