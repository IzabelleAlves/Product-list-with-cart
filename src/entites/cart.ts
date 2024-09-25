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
        const existingProduct = this._products.find((p) => p.id === product.id);

        if (existingProduct) {
            existingProduct.incrementQuantity();
            this._total += product.price;
        } else {
            this._total += product.price * quantity;
            this._products.push(
                new Product(
                    product.id,
                    product.name,
                    product.category,
                    product.price,
                    product.imageUrl,
                    quantity
                )
            );
        }
        this.updateCart();
    }

    removeFromCart(product: Product) {
        const existingProduct = this._products.find((p) => p.id === product.id);

        if (existingProduct) {  
            if (existingProduct.quantity > 1) {
                existingProduct.decrementQuantity();
                this._total -= product.price;
            } else {
                this._total -= product.price;
                this._products = this._products.filter((p) => p.id !== product.id);
            }
        }
        this.updateCart();
    }

    updateCart() {
        const cartContainer = document.getElementById("cart-content");

        if (cartContainer) {
            cartContainer.innerHTML = "";

            this.products.forEach((product) => {
                const itemElement = document.createElement("div");
                itemElement.className = "cart-item";
                itemElement.innerHTML = `
                    <div class="infoName">
                        <span class="names-styles">${product.name}</span>
                        <span class="removeCart-btn"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></i></span>
                    </div>
                    <div class="infoCart">
                        <span class="quantity-styles">X${product.quantity}</span>
                        <span class="price-styles">$ ${product.price.toFixed(2)}</span>
                        <span class="price-styles-total">$ ${(product.price * product.quantity).toFixed(2)}</span>
                    </div>
                `;
                cartContainer.append(itemElement);
            });

            const totalPrice = document.createElement("div");
            totalPrice.className = "total-price";
            totalPrice.innerHTML = `<span>Order Total</span>
            <span id="price-total">$ ${this._total.toFixed(2)}</span>`; 

            const completeOrderBtn = document.createElement("div");
            completeOrderBtn.className = "order-btn";
            completeOrderBtn.innerHTML = "<span>Confirm Order</span>";

            completeOrderBtn.addEventListener("click", () => {
                const modal = document.createElement("div");
                modal.className = "modal";
                if (this.total != 0){
                    modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-btn">&times;</span>
                        <h2>Your order has been successfully completed!</h2>
                    </div>`;
    
                document.body.appendChild(modal);
                }

            const closeBtn = modal.querySelector(".close-btn");
            if(closeBtn){
                closeBtn.addEventListener("click", () => {
                    document.body.removeChild(modal); 
                });
            }
        });

            cartContainer.appendChild(totalPrice);
            cartContainer.appendChild(completeOrderBtn);
        }
    }
}
