import { Item } from "./item";

export interface Stock {
    _id?: string;
    quantity: string;
    isOutOfStock: string;
    item: Item;
}