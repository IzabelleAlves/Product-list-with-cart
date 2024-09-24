import { Product } from "./entites/product";
import data from "../data.json" // data é variável. Não utiliza a chave porque aqui é um dado bruto
import { Cart } from "./entites/cart";


// const product1 = new Product('banana', 'fruta', 10, "www.google.com")
// const cart = new Cart()
// cart.addToCart(product1)
// console.log(cart)


for (let i = 0; i < data.length; i++){
    const produto = new Product(
        data[i].name, 
        data[i].category, 
        data[i].price, 
        data[i].image.desktop
    );
    const cart = new Cart()
    produto.renderProducts(cart)
}