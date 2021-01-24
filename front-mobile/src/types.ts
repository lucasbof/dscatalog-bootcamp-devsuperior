export type Category = {
    id: number;
    name: string;
}

export type Product = {
    id?: number;
    name: string;
    imgUrl: string;
    price: any;
    description: string;
    date: string;
    categories: Category[];
}

export type UserInfo = {
    username: string;
    password: string;
}