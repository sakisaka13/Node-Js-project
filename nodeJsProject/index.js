const express =require ("express");

const app = express();

const Article=require("./models/Article")


const mongoose=require ("mongoose");
mongoose.connect("mongodb+srv://foreversamir13:Canada_1313@cluster0.ktqxpga.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
       console.log("connected successfully")  
}).catch((error)=>{
        console.log("error with connecting with the DB ",error)
})

app.use(express.json())

app.get("/hello",(req,res)=>{
  res.send("hello")

});


app.get("/",(req,res)=>{
  res.send("Hello in node js project");
})
app.get("/numbers",(req,res)=>{
  
  let numbers="";
  for(let i = 0;i<=100;i++)
  {
    numbers += i + " - ";
  }
    //res.send(`the numbers are : ${numbers}`)
    //res.send(__dirname+"/views/numbers.html")
    res.render("numbers.ejs",{
      name:"Samir",
      numbers :numbers
    })
    //res.sendFile(__dirname+"/views/numbers.html")
})
app.get("/sayhello",(req,res)=>
{
//  console.log(req.query)
//  res.send(`Hello ${req.body.name}, Age is : ${req.query.age}`)
res.json({
  name:req.body.name,
  age:req.query.age,
  language:"Arabic"
})

})
  app.get("/salam",(req,res)=>{
  res.send("Salamou Alaykoum")
})
app.get("/findSummation2/:number1/:number2",(req,res)=>{


})

app.put("/test",(req,res)=>
  {
    res.send("You visited test");
  })

app.post("/Articles",async(req,res)=>{
   const newArticle=new Article()
   const artTitle=req.body.articleTitle;
   const artBody=req.body.articleBody

 
   newArticle.title=artTitle;
   newArticle.body=artBody;
   newArticle.numberOfLikes=0;
   await newArticle.save()
   

  res.send("the new article has been stored successefully")
})
app.listen(3000,()=>{
    console.log("I m listening in port 3000 ")
});
app.post("/addComment",(req,res)=>{
  res.send("post request on add comment")

})
app.get("/articles",async(req,res)=>{
  const articles=await Article.find()
  console.log("the artciles are : ", articles)
  res.json(articles)
})
app.get("/articles/:articleId",async(req,res)=>{
  const id=req.params.articleId
  try {
      const article=await Article.findById(id)
      res.json(article)
      return ;
  }
  catch(error)
  {
     console.log("errorwhile reading article of id ",id)
     return res.send("error")
  }
  res.json(article)
})

app.delete("/articles/:articleId",async(req,res)=>{
  const id=req.params.articleId
  try {
      const article=await Article.findByIdAndDelete(id)
      res.json(article)
      return ;
  }
  catch(error)
  {
     console.log("errorwhile reading article of id ",id)
     return res.send("error")
  }
  res.json(article)


})
app.get("/showArticles",async(req,res)=>
{
  const articles= await Article.find()
  res.render("articles.ejs",{
    allArticles:articles

  })



})