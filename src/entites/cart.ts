import { Product } from "./product";

export class Cart {
    private _products: Product[] = [];
    private _total: number = 0;

    get products() {
        return this._products;
    }

    get total() {
        return this._total;
    }

    addToCart(product: Product, quantity: number) {
        const existingProduct = this._products.find(p => 
            p.name == product.name &&
            p.category == product.category &&
            p.price == product.price &&
            p.imageUrl == product.imageUrl 
        );
        
        if (existingProduct) {
            existingProduct.incrementQuantity();
            this._total += product.price; 
        } else {
            this._total += product.price * quantity; 
            this._products.push(new Product(product.name, product.category, product.price, product.imageUrl, quantity));
        }
        this.updateCart();
    }

    getItems() {
        return this._products;
    }

    updateCart() {
        const cartContainer = document.getElementById("cart-content");

        //PESQUISAR COMO ADD OS PRODUTOS UM ABAIXO DO OUTRO E NÃO SOBREPONDO

        if (cartContainer) {
            cartContainer.innerHTML = ""; 

            this.products.forEach((product) => {
                const itemElement = document.createElement("div");
                itemElement.className = "cart-item";
                itemElement.innerHTML = `
                    <span class="names-styles">${product.name}</span>
                    <div class="infoCart">
                        <span class="quantity-styles">X${product.quantity}</span>
                        <span class="price-styles">$ ${product.price.toFixed(2)}</span>
                        <span class="price-styles">$ ${(product.price * product.quantity).toFixed(2)}</span>
                    </div>
                `;
                cartContainer.appendChild(itemElement);
            });

            const totalPrice = document.createElement("div");
            totalPrice.className = "total-price";
            totalPrice.innerHTML = `<span>Order Total</span>
            <span id="price-total">$ ${this._total}</span>`;

            const completeOrderBtn = document.createElement("div");
            completeOrderBtn.className = "order-btn";
            completeOrderBtn.innerHTML = "<span>Confirm Order</span>";

            cartContainer.appendChild(totalPrice);
            cartContainer.appendChild(completeOrderBtn);
        }
    }
}