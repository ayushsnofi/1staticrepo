const express=require('express');
const path=require('path');
const  fs=require('fs');
const app=express();
const bodyparser=require('body-parser')

const port=80;
// Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: Number,
    concern: String
  });
const Contact = mongoose.model('Contact', contactSchema);

// Express Specific Stuff
app.use('/static',express.static('static')) //for serving static files
app.use(express.urlencoded())

// pug Specific stuff
app.set('view engine','pug');//set the template enginge as pug
app.set('views',path.join(__dirname,'views'));//set the view directory

// ENDPONTS
app.get( '/',(req,res)=>{
    const con=''
    const params=''
    res.status(200).render('home.pug',params);
})
app.get( '/contact',(req,res)=>{
    const con=''
    const params=''
    res.status(200).render('contactus.pug',params);
})
app.post( '/contact',(req,res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send('This item has been saved to the database')
    }).catch(()=>{
        res.status(400).send('Item was not saved')
    });
    
    // res.status(200).render('contactus.pug');
})

// start server

app.listen(port,()=>{
    console.log(`the application started at port ${port}`);
})