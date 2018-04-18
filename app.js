const experss = require('express');
const app = experss();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('It works');
})

app.listen(port,()=>{
console.log(`Server Started ${port}`)
});