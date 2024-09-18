import { v4 as uuidv4 } from "uuid";

export class Produto {
    private _id: string = uuidv4();
    private _name: string;
    private _imageUrl: string;
    private _price: number;
    private _category: string;


    constructor (
        name: string, 
        category: string, 
        price: number,
        imageUrl: string
    ) {
        this._name = name,
        this._category = category,
        this._price = price,
        this._imageUrl = imageUrl
    }
}