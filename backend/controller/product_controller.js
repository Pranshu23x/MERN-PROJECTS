import Product from "../models/Product.js";
import mongoose from "mongoose";
export const getProducts=  async(req, res)=>{
   try{
     const product= await  Product.find({})
     return res.status(200).json({success: true , data:product})
   }
   catch{
     console.error("Error to  fetch" , error.message)
     return res.status(500).json({success: false , message: "Got error"}) 
   }
}

export const createProduct = async (req,res)=>{


    const product= req.body //user will send data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false , message: "Provide all fields"})
    }
    const newProduct= new Product(product)

    try{
        await newProduct.save() // will save to database
        res.status(200).json({success: true , data: newProduct})
    }
    catch(error){
        console.error("Error to create product" , error.message)
        res.status(500).json({success: false , message: "Internal server error"})
    }
}

export const deleteProduct= async(req,res)=>{
    const {id}= req.params
    console.log("id:" , id)
      
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false , message:"Product not found"})
    }

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message: "Item deleted"})
    }
   catch(error){
     console.error("Error to delete" , error.message)
     return res.status(500).json({success: false , message: "Server error"}) 
    }
}

export const updateProduct=  async(req,res)=>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false , message:"Invalid id"})
    }

    try{
        const newProduct= await Product.findByIdAndUpdate(id ,req.body,{new:true})
            res.status(200).json({
            success: true,
            data: newProduct,   
            message: "Value updated"
    });
    }
    catch(error){
     console.error("Error to  update" , error.message)
     return res.status(500).json({success: false , message: "Got error"}) 
    }
}