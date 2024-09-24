import { v4 as uuid4 } from "uuid";
import { Cart } from "./cart";

export class Product {
  private _id: string = uuid4();
  private _name: string = "";
  private _category: string = "";
  private _price: number = 0;
  private _imageUrl: string = "";
  private _quantity: number = 1

  constructor(name: string, category: string, price: number, imageUrl: string, quantity: number = 1) {
      this._category = category,
      this._price = price,
      this._name = name,
      this._imageUrl = imageUrl;
      this._quantity = quantity;
  }

  get category(){
    return this._category;
  }

  get imageUrl(){
    return this._imageUrl;
  }

  get quantity() {
    return this._quantity;
  }

  get price(){
    return this._price;
  }

  get name(){
    return this._name;
  }

  incrementQuantity() {
    this._quantity++;
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

    //Variável para iterar itens que foram selecionados 
    let itemCount = 0;

    //Evento para alterar a quantidade dos itens selecionados e mudar o itemCount
    addCartBtn.addEventListener("click", () => {
        addCartBtn.classList.add("colorBtnIcons")

        //Altera diretamente o valor que vemos ao add e remover
        if (itemCount === 0) {

          //VER COMO LINKAR O ITEMCOUNT AO CART

          addCartBtn.innerHTML = `
            <div class="decrement-btn"><i class="fa fa-minus-circle" aria-hidden="true"></i></div>
            <span class="item-count">${itemCount}</span>
            <div class="increment-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
          `;
      
          const decrementBtn = addCartBtn.querySelector(".decrement-btn");
          const incrementBtn = addCartBtn.querySelector(".increment-btn");
          
          if (incrementBtn){
              incrementBtn.addEventListener("click", (event) => {
                itemCount++;
                const itemCountElement = addCartBtn.querySelector(".item-count");
                if (itemCountElement) {
                  itemCountElement.innerHTML = `${itemCount}`;
                }
              });
          }
          
          if (decrementBtn){
              decrementBtn.addEventListener("click", (event) => {
                if (itemCount > 0) {
                  itemCount--;
                  const itemCountElement = addCartBtn.querySelector(".item-count");
                  if (itemCountElement) {
                    itemCountElement.innerHTML = `${itemCount}`;
                  }
                }
              });
          }
          cart.addToCart(this, itemCount);
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