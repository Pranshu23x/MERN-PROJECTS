import express from "express";
import dotenv from "dotenv"
import {connectDB} from "./config/db.js"
import productRoutes from "./routes/Product_route.js"
import path from "node:path";
import fs from "node:fs";
dotenv.config()

const app= express();
app.use(express.json()) //middleware which allows us to to accept json in the body

const PORT=process.env.PORT || 5000
const __dirname=path.resolve();
app.use("/api/products" , productRoutes)

//code to common the server--
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get(/.*/,  (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "dist", "index.html")
    );
  });
}

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(
  "Serving from:",
  path.join(__dirname, "frontend", "dist")
);
console.log(
  "index exists:",
  fs.existsSync(path.join(__dirname, "frontend", "dist", "index.html"))
);
app.listen(PORT, ()=>{  
    connectDB(); 
    console.log("Server running at port 5000")
})

