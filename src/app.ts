// importar data.json
// importar entities/product.ts
//criar os objetos de produto utilizando os dados data.json

import { Produto } from "./entites/product";
import data from "../data.json" // data é variável. Não utiliza a chave porque aqui é um dado bruto

for (let i = 0; i < data.length; i++){
    const produto = new Produto(
        data[i].name, 
        data[i].category, 
        data[i].price, 
        data[i].image.desktop
    );
    produto.render()
}