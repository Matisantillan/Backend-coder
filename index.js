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

        const findedProduct = this.products.find((product) => product.title === title)
        
        if(findedProduct){
            console.log(`Error, ya existe un producto con ese titulo: ${title}`)

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

    getProductsByCode(code){
        const findedProduct = this.products.find((product) => product.code === code)

        if(findedProduct){
            console.log('Producto encontrado \n'+ JSON.stringify(findedProduct))
        }else{
            console.log('No existe ningun producto con ese Code')
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
        code: "a",
        stock: 35,
        type:"module"
    }

    const newProduct2 = {
        title: "Jogger camuflado",
        description: "Pantalon jogger camuflado",
        price: 750,
        thumbnail:"small picture of the product",
       code: "b",
        stock: 15
    }

    


    const newProduct3 = {
        title: "Buzo polar",
        description: "Buzo polar con capucha",
        price: 1100,
        thumbnail: "small picture of the product",
        code: "a",
        stock: 33,
        type:"module"

    }

    const newProduct4 = {
        title: "Pantalon Chino",
        description: "Pantalon estilo chino de gabardina beige",
        price: 2100,
        thumbnail: "small picture of the product",
        code: "b",
        stock: 30,
        type:"module"

    }
    const newProduct5 = {
        title: "Buzo Belgrano suplente",
        description: "Buzo equipacion suplente Belgrano",
        price: 1500,
        thumbnail: "small picture of the product",
        code: "a",
        stock: 23,
        type:"module"

    }
    const newProduct6 = {
        title: "Remera Maestro Yoda",
        description: "Remera mangas cortas Maestro Yoda",
        price: 1000,
        thumbnail: "small picture of the product",
        code: "b",
        stock: 15,
        type:"module"

    }
    const newProduct7 = {
        title: "Campera rompeviento",
        description: "Campera rompeviento fucsia",
        price: 2000,
        thumbnail: "small picture of the product",
        code: "a",
        stock: 10,
        type:"module"

    }
    const newProduct8 = {
        title: "Zapatillas botitas",
        description: "Zapatillas estilo converse azules",
        price: 1800,
        thumbnail: "small picture of the product",
        code: "b",
        stock: 7,
        type:"module"

    }
    const newProduct9 = {
        title: "Pack Medias",
        description: "Pack de 5 pares de medias blancas largas",
        price: 800,
        thumbnail: "small picture of the product",
        code: "a",
        stock: 10,
        type:"module"

    }
    const newProduct10 = {
        title: "Piluso",
        description: "Piluso negro",
        price: 1000,
        thumbnail: "small picture of the product",
        code: "b",
        stock: 5,
        type:"module"

    }

    
    await productManager.addProduct(newProduct)
    await productManager.addProduct(newProduct2)
    await productManager.addProduct(newProduct3)
    await productManager.addProduct(newProduct4)
    await productManager.addProduct(newProduct5)
    await productManager.addProduct(newProduct6)
    await productManager.addProduct(newProduct7)
    await productManager.addProduct(newProduct8)
    await productManager.addProduct(newProduct9)
    await productManager.addProduct(newProduct10)



    products = await productManager.getProducts();
    //console.log(products)

    app.use(express.urlencoded({ extended: true}))
  
    app.get('/products', (req, res) =>{

            let limit = req.query.limit;
            
            if (!limit) {
                return res.send({ products });
            }


            let limitedProducts = products.slice(0, limit);

            // Enviar los productos limitados al cliente
            res.send({ products: limitedProducts });
        
    })

    app.get('/:productoId', (req, res) =>{
        const productId = req.params.productoId
        const product = products.find(p => p.id === productId)
        
        if (!product){
            return res.status(404).send('Usuario no encontrado')
        }
        res.send(product)
    })







    app.listen(8080, () => {
        console.log('running from express')
    })



    

    
    
    
}



main();





