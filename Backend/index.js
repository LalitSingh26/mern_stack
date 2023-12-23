const express = require('express');
require('./db/config');
const User = require('./db/user')
const product = require('./db/Product')
const cors = require('cors');
const Product = require('./db/Product');
const app = express();
const jwt = require('jsonwebtoken');
const jwtKey='e-comm';
app.use(express.json());
app.use(cors());

app.post('/signUp', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({result},jwtKey,{expiresIn:"2h"},(error,token)=>{
        if(error){
            resp.send({result:"Something went wrong!! please try again"});
        }
        resp.send({result,auth:token});
       
})
});

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            jwt.sign({user},jwtKey,{expiresIn:"2h"},(error,token)=>{
                if(error){
                    resp.send({result:"Something went wrong!! please try again"});
                }
                resp.send({user,auth:token});
               
        })
    }
        else {
            resp.send({ result: 'No user Found' });
        }
            
            
           
    }
    else {
        resp.send({ result: 'No user Found' });
    }
});

app.post('/add-product', verifyToken,async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result)
}
)

app.get('/products', verifyToken, async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    }
    else {
        resp.send({ result: 'No Products found' })
    }
});

app.delete('/product/:id',verifyToken, async (req, resp) => {
    resp.send(req.params.id);
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

app.get('/product/:id', verifyToken,async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    }
    else
    {
        resp.send({Result:"No Record Found"});
    }
})

app.put('/product/:id',verifyToken, async (req,resp)=>{
    let result= await Product.updateOne(
        {_id:req.params.id},
        {
         $set:req.body
        }
    );
    resp.send(result); 
});
//in this we are using $or as we want to search in multiple fields
app.get('/search/:key',verifyToken,async (req,resp)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
        ]
    });
    resp.send(result);
});

function verifyToken(req,resp,next){
    let token = req.headers['authorization'];
    if(token){
         token= token.split(' ')[1];
         jwt.verify(token,jwtKey,(error,valid)=>{
               if(error){
                  resp.status(401).send({result:"please provide a valid token"})
               }else{
                next();
               }
         }); 
    }
    else{
        resp.status(403).send({result:"please add token with Header"})
    }
    
}

app.listen(5000); 