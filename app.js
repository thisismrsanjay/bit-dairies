const experss = require('express');
const app = experss();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('./models/User');
require('./config/passport')(passport);

const auth = require('./routes/auth');
mongoose.connect(require('./config/keys').mongoURI);

app.get('/',(req,res)=>{
    res.send('It works');
})

//app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.user = req.user||null;
    next();
})



app.use('/auth',auth);
app.listen(port,()=>{
console.log(`Server Started ${port}`) 
});