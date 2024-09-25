import { v4 as uuid4 } from "uuid";
import { Cart } from "./cart";

export class Product {
  private _id: number;
  private _name: string = "";
  private _category: string = "";
  private _price: number = 0;
  private _imageUrl: string = "";
  private _quantity: number = 0;
  // private _total: number = 0

  constructor(
    id: number,
    name: string,
    category: string,
    price: number,
    imageUrl: string,
    quantity: number = 0
  ) {
    this._id = id;
    (this._category = category),
      (this._price = price),
      (this._name = name),
      (this._imageUrl = imageUrl);
    this._quantity = quantity;
  }

  get category() {
    return this._category;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  get quantity() {
    return this._quantity;
  }

  get price() {
    return this._price;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  incrementQuantity() {
    this._quantity++;
  }

  decrementQuantity() {
    this._quantity--;
  }

  //Renderizar os produtos dinamicamente
  renderProducts(cart: Cart) {
    //Card
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    //Imagem card
    const productImage = document.createElement("div");
    productImage.className = "product-image";
    productImage.innerHTML = `<img
                src="${this._imageUrl}"
                alt="${this._name}"
              />`;

    //Botão add ao carrinho
    const addCartBtn = document.createElement("div");
    addCartBtn.className = "add-cart-btn";
    addCartBtn.innerHTML = `<div class="add-cart-icon">
                <i class="fa fa-cart-plus" aria-hidden="true"></i>
              </div>
              <span>Add to Cart</span>`;

    const incrementBtn = `<i class="fa fa-plus-circle" aria-hidden="true"></i>`;
    const decrementBtn = `<i class="fa fa-minus-circle" aria-hidden="true"></i>`;


    //Evento para alterar a quantidade dos itens selecionados e mudar o itemCount
    addCartBtn.addEventListener("click", () => {
      addCartBtn.classList.add("colorBtnIcons");

      //Altera diretamente o valor que vemos ao add e remover
      if (this._quantity === 0) {
        addCartBtn.innerHTML = `
            <div class="decrement-btn">${decrementBtn}</div>
            <span class="item-count">${this._quantity}</span>
            <div class="increment-btn">${incrementBtn}</div>
          `;

        const selectDecrementBtn = addCartBtn.querySelector(".decrement-btn");
        const selectIncrementBtn = addCartBtn.querySelector(".increment-btn");

        if (selectIncrementBtn) {
          selectIncrementBtn.addEventListener("click", (event) => {
            this._quantity++;
            const itemCountElement = addCartBtn.querySelector(".item-count");
            if (itemCountElement) {
              itemCountElement.innerHTML = `${this._quantity}`;
            }
            cart.addToCart(this, this._quantity);
          });
        }

        if (selectDecrementBtn) {
          selectDecrementBtn.addEventListener("click", (event) => {
            if (this._quantity > 0) {
              this._quantity--;
              const itemCountElement = addCartBtn.querySelector(".item-count");
              if (itemCountElement) {
                itemCountElement.innerHTML = `${this._quantity}`;
              }
              cart.removeFromCart(this)
            }
          });
        }
      }
    });

    //Criando as informações dos cards
    const productInfo = document.createElement("div");
    productInfo.className = "product-information";

    const productCat = document.createElement("div");
    productCat.className = "product-category";
    productCat.innerHTML = `<span>${this._category}</span>`;

    const productName = document.createElement("div");
    productName.className = "product-name";
    productName.innerHTML = `<span>${this._name}</span>`;

    const productPrice = document.createElement("div");
    productPrice.className = "product-price";
    productPrice.innerHTML = `<span>$ ${this._price.toFixed(2)}</span>`;

    //Adicionando as informações ao productInfo
    if (productInfo) {
      productInfo.appendChild(productCat);
      productInfo.appendChild(productName);
      productInfo.appendChild(productPrice);
    }

    //Adicionando as informações ao card
    const cards = document.getElementById("cards");
    if (cards) {
      cards.appendChild(productCard);
    }

    //Renderizando tudo no html
    productCard.append(productImage, addCartBtn, productInfo);
  }
}
