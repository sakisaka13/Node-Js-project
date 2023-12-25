const mongoose=require("mongoose");

const Schema=mongoose.Schema
const  artcileShchema= new Schema({
    title:String,
    body: String,
    numberOfLikes: Number

})

const Article=mongoose.model("Article",artcileShchema)

module.exports=Article