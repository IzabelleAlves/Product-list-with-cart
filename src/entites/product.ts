import { v4 as uuid4 } from "uuid";

export class Product {
  private _id: string = uuid4();
  private _name: string = "";
  private _category: string = "";
  private _price: number = 0;
  private _imageUrl: string = "";

  constructor(name: string, category: string, price: number, imageUrl: string) {
    (this._category = category),
      (this._price = price),
      (this._name = name),
      (this._imageUrl = imageUrl);
  }

  get price(){
    return this._price
  }

  renderProducts() {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const productImage = document.createElement("div");
    productImage.className = "product-image";
    productImage.innerHTML = `<img
                src="${this._imageUrl}"
                alt="${this._name}"
              />`;

    const addCartBtn = document.createElement("div");
    addCartBtn.className = "add-cart-btn";
    addCartBtn.innerHTML = `<div class="add-cart-icon">
                <i class="fa fa-cart-plus" aria-hidden="true"></i>
              </div>
              <span>Add to Cart</span>`;

    let itemCount = 0;

    addCartBtn.addEventListener("click", () => {
        addCartBtn.classList.add("colorBtnIcons")
        if (itemCount === 0) {
            itemCount++

          addCartBtn.innerHTML = `
            <div class="decrement-btn"><i class="fa fa-minus-circle-o" aria-hidden="true"></i></div>
            <span class="item-count">${itemCount}</span>
            <div class="increment-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
          `;
      
          const decrementBtn = addCartBtn.querySelector(".decrement-btn");
          const incrementBtn = addCartBtn.querySelector(".increment-btn");
          
          if (incrementBtn){
              incrementBtn.addEventListener("click", (event) => {
                itemCount++;
                addCartBtn.querySelector(".item-count").innerText = itemCount;
              });
          }
          
          if (decrementBtn){
              decrementBtn.addEventListener("click", (event) => {
                if (itemCount >= 0) {
                  itemCount--;
                  addCartBtn.querySelector(".item-count").innerText = itemCount;
                }
              });
          }
        }
      });
      
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
    productPrice.innerHTML = `<span>$ ${this._price}</span>`;

    if (productInfo) {
      productInfo.appendChild(productCat);
      productInfo.appendChild(productName);
      productInfo.appendChild(productPrice);
    }

    const cards = document.getElementById("cards");
    if (cards) {
      cards.appendChild(productCard);
    }

    productCard.append(productImage, addCartBtn, productInfo);
  }
  
  
}