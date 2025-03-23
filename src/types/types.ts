export default interface Icard {
    category: string; 
    description: string; 
    id: string;
    image: string;
    price: number
    title: string 
}

interface Irequest<T> {
    total: number;
    items: T[];
}

interface IpostData<T> {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: T[];
}

interface PostDataType {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

type CustomRequest = Irequest<Icard>;
type postData = IpostData<string>;


export { CustomRequest, postData, PostDataType }