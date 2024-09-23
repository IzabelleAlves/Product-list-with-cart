import { Product } from "./product";

export class Cart {
    private _products: Product[] = []
    private _total: number = 0

    get products(){
        return this._products
    }

    get total(){
        return this._total
    }

    addToCart(product: Product){
        const productCart = this._products.includes(product)
        //Pesquisar como add isso no carrinho
        this._total += product.price
        this._products.push(product)
    }

}