const express = require('express');
const axios = require('axios');
const app = express();
const rateLimit = require('express-rate-limit');
const {errorHandler} = require('./errorHandler/error');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  
    max: 100,  
    message: 'Request limit exceeded, please try again later'  
});

app.use(limiter);
const router = require('./routers/weatherRout');
app.use('/weather',router);
app.use(errorHandler);
app.listen(3000);



