import { postData } from '../types/types'
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

    setItems(items: string[]) {
        this.postData.items = items
    }

    setTotal(total: number) {
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

    get data(): postData {
        return this.postData
    }

    setError(field: HTMLElement) {
        field.textContent = 'Пожалуйста, заполните все данные'
    }

    hideError(field: HTMLElement) {
        field.textContent = ''
    }
}