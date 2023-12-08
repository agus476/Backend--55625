import  express  from "express";
import ProductRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api/products", ProductRouter);
app.use("/api/carts", cartRouter);

const server = app.listen(8080,()=>{

    console.log("Listen on port 8080")
  })

  server.on('error',error => console.log(error))