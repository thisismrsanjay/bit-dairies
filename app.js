const experss = require('express');
const app = experss();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const passport = require('passport');
require('./config/passport')(passport);

const auth = require('./routes/auth');

app.get('/',(req,res)=>{
    res.send('It works');
})
app.use('/auth',auth);


app.listen(port,()=>{
console.log(`Server Started ${port}`)
});