import { Router } from "express";
const cartRouter = Router()
import cartManager from "../cartManager.js"
const manager = new cartManager()
import ProductManager from "../productManager.js"
const products = new ProductManager("../products.json")



cartRouter.get('/', async (req,res)=>{
 
    const AllCarts = await manager.getAllCarts()
    res.send(AllCarts)


})

cartRouter.post('/', async (req,res)=>{
    let newCart ={products:[]}
    let cartId = await manager.addCart(newCart)
    res.status(201).json({menssage:"Cart added successfully", cartId}  )


})


cartRouter.get('/:cid', async (req,res)=>{
  let id = req.params.cid
  let cartId = await manager.getCartById(id)
  !cartId ? res.send("ID not found"):res.send(cartId.products)

})


cartRouter.post("/:cid/product/:pid",async (req,res)=>{
   
      let cid = req.params.cid
      let pid = req.params.pid
      let totalProducts = await products.getProducts()
      let productId = totalProducts.find(e => e.id == pid )
      let newProduct ={id: productId.id, quantity:1}
      await manager.addProductsToCart(cid,pid,newProduct)

      res.send("Porduct added to cart")

})
export default cartRouter;