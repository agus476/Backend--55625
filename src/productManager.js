import fs from "fs"

class ProductManager{

    constructor(file){
        this.path = file
    }

    async getProducts (){
   
      const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
      
       return data
       
    }

    async getId(){
        let data  = await this.getProducts()
        return data.length + 1;

    }
  

    async addProduct(title,description,price,thumbnail,code,stock){ 
                 
        let newProduct = {
            id: await this.getId(),
            title:title,
            description:description,
            price:price,
            thumbnail:thumbnail,
            code:code,
            stock:stock,
      }
        try{
          if(!fs.existsSync(this.path)){
            const emptyList = []
            emptyList.push({...newProduct,id:await this.getId()})

            await fs.promises.writeFile(this.path,JSON.stringify(emptyList,null,'\t'))
          }
          else{
            const data = await this.getProducts() 
            const repeatCode = data.some(e => e.code == newProduct.code)
            repeatCode == true ? console.log("El codigo esta repetido") : data.push({...newProduct,id:await this.getId()})
               
               await fs.promises.writeFile(this.path,JSON.stringify(data,null,'\t'))
          }
          
          
         



        }
        
        catch(err){
          console.log(err)
         }

      }


      async getProductById(id){
       const data = await this.getProducts()
       let productFind = data.find(e => e.id == id)
       return productFind === undefined ?console.log("Not found"): console.log(productFind)
       

      }

      async deleteProduct(id){
        const data = await this.getProducts()
        let i = data.findIndex(e => e.id == id)
        data.splice(i,1)
        this.products.push(data)
        
      }


      async updateProduct(id, product){
       let data = await this.getProducts()
       let i = data.findIndex(e => e.id == id )
       product.id = id 
       data.splice(i,1,product)
       this.products.push(data)


      }




}

export default ProductManager;

// const funcionAsync = async () => {
//     const productManager = new ProductManager()
//   //console.log(await productManager.getProducts())
//   await productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
//   await productManager.getProducts()
//   console.log(await productManager.getProducts())
//   await productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
// }

// funcionAsync()