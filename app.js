require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const routes = require('./routes/routes'); // Import your routes
const apiRoutes = require('./api/routes'); // Import your routes

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'some_secret_key',
  resave: false,  
  saveUninitialized: true,
}));  

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.use(methodOverride('_method'));

// set template engine
app.set('view engine', 'ejs');


mongoose.connect("mongodb+srv://walizada300:3dvF2rqpoqNLeOpD@cluster0.e7oqskb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Set static folder
app.use(express.static('public'));

// rout prefix
app.use(routes);
app.use(apiRoutes);
