const express = require('express');
const app = express();

const cors = require("cors");

const routes = require('./Routes/routes');



app.use(cors());



app.use(routes);

app.use('/', (req, res, next) => {    
    res.status(200).json({});
});

app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app; 
