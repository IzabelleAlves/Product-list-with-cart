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
    
    render() {
        const containerPrincipal = document.createElement("div")
        containerPrincipal.className = "container-principal"

        const products = document.createElement("div")
        products.className = "cards"    
        products.innerHTML = `
            <div class="product-card">
                <img class= "product-image" src="${this._imageUrl}" alt="${this._name}">
                <div class="product-information">
                    <div class="product-category">${this._category}</div>
                    <div class="product-title">${this._name}</div>
                    <div class="product-price">$${this._price.toFixed(2)}</div>
            </div>
            </div>
            <div class="add-cart-btn">
                <div class="add-cart-icon">
                    <i class="fa fa-cart-plus" aria-hidden="true"></i>
                </div>
                <span>Add to Cart</span>
            </div>
        `; 
        

        // const addToCart = document.createElement("div")
        // addToCart.innerHTML = `
        // <div class="add-cart-btn">
        //         <div class="add-cart-icon">
        //             <i class="fa fa-cart-plus" aria-hidden="true"></i>
        //         </div>
        //         <span>Add to Cart</span>
        //     </div>
        //     `;

        // const cart = document.createElement("div")
        // cart.className = "cart"
        // cart.innerHTML = `
        //     <div class="header-cart">Your Cart</div>
        // `;

        containerPrincipal.append(products)

        const mainContainer = document.getElementById('main-id')
        if (mainContainer) {
            mainContainer.appendChild(containerPrincipal)
        }    
        return containerPrincipal;
    }
    
    add() {
        return this._id;
    }
    
    remove() {
        console.log("olá")
    }
}