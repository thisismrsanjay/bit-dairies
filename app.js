const experss = require('express');
const app = experss();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('./models/User');
require('./models/Post')
require('./config/passport')(passport);

app.set('view engine','ejs');
const index = require('./routes/index');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
mongoose.connect(require('./config/keys').mongoURI);

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

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
app.use(experss.static(__dirname+'/public'));

app.use('/',index);
app.use('/auth',auth);
app.use('/posts',posts);
app.listen(port,()=>{
console.log(`Server Started ${port}`) 
});