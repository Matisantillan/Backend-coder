import fs from 'fs'
import express from 'express';




const writeFile = (path, products) => fs.promises.writeFile(path, JSON.stringify({products}));

const readFile = async(path) => {
    const asyncGetProducts = await fs.promises.readFile(path)

    const turnIntoParse = JSON.parse(asyncGetProducts)
    return turnIntoParse
}



export default class ProductManager{
    constructor(path){
        
        this.products = [];
        this.path = path;
    };

    

    initialize = async() => {
        const existsFile = fs.existsSync(this.path)

        if(existsFile){
            console.log('El archivo ya existia')
            const {products} = await readFile(this.path)
            this.products = products
            console.log(this.products)
        }else{
            await writeFile(this.path, this.products)
            console.log('El archivo se creo correctamente')
        }
    }

    getProducts = async() => {
        const jsonData = await readFile(this.path)
        return jsonData

    };

    addProduct = async ({title, description, price, thumbnail, code, stock}) => {

        const findedProduct = this.products.find((product) => product.title === title || product.code === code)
        
        if(findedProduct){
            console.log(`Error, ya existe un producto con ese titulo o codigo: ${title} - ${code}`)

        }else{

            const id = this.products.length + 1;

            this.products.push({id, title, description, price, thumbnail, code, stock});

        };
        await writeFile(this.path, this.products);
        console.log('Producto agregado correctamente')    
    };

    getProductsById(id){
        const findedProduct = this.products.find((product) => product.id === id)

        if(findedProduct){
            console.log('Producto encontrado \n'+ JSON.stringify(findedProduct))
        }else{
            console.log('No existe ningun producto con ese Id')
        };
    };

    updateProduct = async(id, newProduct) => {
        const findIndexProduct = this.products.findIndex((product) => product.id === id)
        if(findIndexProduct !== -1){
            const id = this.products[findIndexProduct].id

            this.products[findIndexProduct] = {
                id, 
                ...newProduct
            }
            await writeFile(this.path, this.products);
            console.log('Producto actualizado correctamente')

        }else {
            console.log('No se encuentra un producto con el id solicitado')
        }

    }

    deleteProduct = async(id) => {
        const findIndexProduct = this.products.findIndex((product) => product.id === id)
        if(findIndexProduct !== -1){
            const newProducts = this.products.filter(product => product.id !== id)

            await writeFile(this.path, newProducts)
            console.log('Producto eliminado satisfactoriamente')

        }else {
            console.log('No se encuentra un producto con el id solicitado')
        }
    }


};

async function main () {
    const app = express()
    const productManager = new ProductManager('./productos.json');

    await productManager.initialize();

    let products = await productManager.getProducts();
    //console.log(products);

    const newProduct = {
        title: "Camisa a cuadros",
        description: "Camisa a cuadros, corte italiano",
        price: 500,
        thumbnail: "small picture of the product",
        code: "B305",
        stock: 35,
        type:"module"
    }

    const newProduct2 = {
        title: "Jogger camuflado",
        description: "Pantalon jogger camuflado",
        price: 750,
        thumbnail:"small picture of the product",
       code: "C100",
        stock: 15
    }

    


    const newProduct3 = {
        title: "Buzo polar",
        description: "Buzo polar con capucha",
        price: 1100,
        thumbnail: "small picture of the product",
        code: "F30",
        stock: 33,
        type:"module"

    }
    
    await productManager.addProduct(newProduct)
    await productManager.addProduct(newProduct2)
    await productManager.addProduct(newProduct3)

}

    main();



    
/*
    products = await productManager.getProducts();
    //console.log(products)
  
    app.get('/products', (req, res) =>{
        res.send(products)
    })

    app.get('/products/:id', (req, res) =>{
        products.id = req.params
        res.send(products[products.id])
    })

    app.listen(3000, () => {
        console.log('running from express')
    })
    
    
}














productos
[   
    {
        "title": "Camisa a cuadros",
        "description": "Camisa a cuadros, corte italiano",
        "price": 500,
        "thumbnail": "small picture of the product",
        "code": "B305",
        "stock": 35,
        "type":"module"

    },
    {
        "title": "Jogger camuflado",
        "description": "Pantalon jogger camuflado",
        "price": 750,
        "thumbnail":"small picture of the product",
        "code": "C100",
        "stock": 15
        

    },
    {
        "title": "Medias invisibles",
        "description": "Medias, tipo soquetes invisibles",
        "price": 150,
        "thumbnail":"small picture of the product",
        "code": "A200",
        "stock": 15
        

    }
]



productManager.addProduct(newProduct1);
productManager.addProduct(newProduct2);

console.log(productManager.deleteProduct(6))
console.log(productManager.deleteProduct(2))
console.log(productManager.getProductsById(1));
console.log(productManager.getProductsById(2));



*/