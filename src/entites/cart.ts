import { Product } from "./product";

export class Cart {
  private _products: Product[] = [];
  private _total: number = 0;
  private _quantityTotal: number = 0;

  get products() {
    return this._products;
  }

  get total() {
    return this._total;
  }

  get quantityTotal() {
    return this._quantityTotal;
  }

  //add o produto dentro do carrinho de compras
  addToCart(product: Product, quantity: number) {
    const existingProduct = this._products.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.incrementQuantity();
      this._quantityTotal++;
      this._total += product.price;
    } else {
      this._quantityTotal += quantity;
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

  //removendo o produto dentro do carrinho de compras
  removeFromCart(product: Product) {
    const existingProduct = this._products.find((p) => p.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.decrementQuantity();
        this._quantityTotal--;
        this._total -= product.price;
      } else {
        this._total -= product.price;
        this._products = this._products.filter((p) => p.id !== product.id);
        this._quantityTotal--;
      }
    }
    this.updateCart();
  }

  //add index ao topo do carrinho
  updateCartDisplay() {
    const nameCart = document.getElementById("header-cart");
    if (nameCart) {
      nameCart.innerHTML = `
            <div>
                Your Cart (${this._quantityTotal})
            </div>
            `;
    } else {
      console.log("error");
    }
  }

  //renderizando o carrinho de compras no html
  updateCart() {
    this.updateCartDisplay();
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

        //Clique no "x" do carrinho para remover os itens
        const removeBtn = itemElement.querySelector(".removeCart-btn");
        if (removeBtn && product.quantity >= 1) {
          removeBtn.addEventListener("click", () => {
            this.removeFromCart(product);
          });
        }

        cartContainer.append(itemElement);
      });

      //preço total dentro do carrinho
      const totalPrice = document.createElement("div");
      totalPrice.className = "total-price";
      totalPrice.innerHTML = `<span>Order Total</span>
            <span id="price-total">$ ${this._total.toFixed(2)}</span>`;

      const carbonNeutralImage = document.createElement("div");
      carbonNeutralImage.className = "carbon";
      carbonNeutralImage.innerHTML = `<img src="./assets/images/icon-carbon-neutral.svg" alt="" srcset="" />
      <span>This is a carbon neutral delivery</span>`;

      //botão de confirmar pedido dentro do carrinho
      const completeOrderBtn = document.createElement("div");
      completeOrderBtn.className = "order-btn";
      completeOrderBtn.innerHTML = "<span>Confirm Order</span>";

      //modal
      completeOrderBtn.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.className = "modal";
        if (this.total != 0) {
          // Cria o conteúdo do modal
          let productsList = "<ul>";
          this.products.forEach((product) => {
            productsList += `
                    <li>
                      <div class="container-order-list">
                        <div class="order-list-img">
                          <img src="${product.imageUrl}" />
                        </div>
                        <div>
                          <div class="organize-products-list">
                            <span class="product-name-order">${product.name}</span>
                            <div><span class="price-styles-total-modal">$ ${(product.price * product.quantity).toFixed(2)}</span></div>
                          </div>
                        </div>
                        <div class="organize-products-order">
                            <div class="quantity-price-order">
                              <span class="quantity-styles">X${product.quantity}</span>
                              <span class="price-styles">@$${product.price.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </li>
              `;
          });
          productsList += "</ul>";

          modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <div class="header-modal">
                      <img src="./assets/images/icon-order-confirmed.svg" />
                      <h2>Order confirmed</h2>
                      <span>We hope you enjoy your food!</span>
                    </div>
                    <div class="order-list-product">
                      <div class="order-item-list">${productsList}</div>
                    </div>
                    
                    <div class="modal-total">
                        <span>Total Price:</span>
                        <strong>$ ${this.total.toFixed(2)}</strong>
                    </div>
                    <div class="new-order-btn">
                        <div class="order-btn">
                          <span>Start new order</span>
                        </div>
                    </div>
                </div>
            `;
          document.body.appendChild(modal);
        }

        //botão fechar modal
        const closeBtn = modal.querySelector(".close-btn");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            document.body.removeChild(modal);
          });
        }
      });

      cartContainer.appendChild(totalPrice);
      cartContainer.appendChild(carbonNeutralImage);
      cartContainer.appendChild(completeOrderBtn);
    }
  }
}
