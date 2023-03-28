class ProductManager{
    constructor(){
        this.products = []
    };

    getProducts(){
        return this.products

    };

    addProduct({title, description, price, thumbnail, code, stock}){

        const findedProduct = this.products.find((product) => product.title === title || product.code === code)

        if(findedProduct){
            console.log(`Error, ya existe un producto con ese titulo o codigo: ${title} - ${code}`)

        }else{

            const id = this.products.length + 1;

            this.products.push({id, title, description, price, thumbnail, code, stock});
            
        };    
    };

    

    getProductsById(id){
        const findedProduct = this.products.find((product) => product.id === id)

        if(findedProduct){
            console.log('Producto encontrado \n'+ JSON.stringify(findedProduct))
        }else{
            console.log('No existe ningun producto con ese Id')
        };
    };


};

const productManager = new ProductManager();




const newProduct1 = {
    title: 'Camisa a cuadros',
    description: 'Camisa a cuadros, corte italiano',
    price: 500,
    thumbnail:'small picture of the product',
    code: 'B305',
    stock: 35,

};
const newProduct2 = {
    title: 'Jogger camuflado',
    description: 'Pantalon jogger camuflado',
    price: 750,
    thumbnail:'small picture of the product',
    code: 'C100',
    stock: 15,

};

productManager.addProduct(newProduct1);
console.log(productManager.getProducts());
productManager.addProduct(newProduct1);
//productManager.addProduct(newProduct2);

console.log(productManager.getProductsById(250));
console.log(productManager.getProductsById(1));
//console.log(productManager.getProductsById(2));