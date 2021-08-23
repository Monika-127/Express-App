const express=require('express');// MVC based web app framework
const morgan=require('morgan');//to log on console(history of req res)
const app=new express();
app.use(morgan('dev'));//middleware first pass to console log and then to handler i.e get/post
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
    //res.send("welcome to express server home");
})
app.get('/contacts',(req,response)=>{//deliberatly used res as response t hanle error
    res.send("contact info");
})
function getProducts(req,res,next){
    var id=req.query.catId;
    var products=['lapi','mouse','keyboard','ipad'];
    req.products=products;
    //make db call
    next();//invoke the next handler

}
app.get('/products',getProducts,(req,res,next)=>{//next used to chain handlers
  //  var id=req.query.catId;

    res.send("product info for category "+req.products);
})
var users=[{name:'Tina',age:34},{name:'Amit',age:44}];
app.get('/users',(req,res)=>{
res.json(users);
})
app.post('/products',(req,res)=>{
    res.send("added new product info");
})
//place at the end of all routing config
app.use((req,res,next)=>{
    res.status(404).send('path not found');
})
//handing server side script errors
app.use((err,req,res,next)=>{
    res.status(501).send('internal server error'+err.messagle);
})

app.listen(3300,()=>{
    console.log("post 3300 listening");
})