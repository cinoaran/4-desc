const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const logger =  require('morgan');
const config = require('config');
const cors = require('cors');


const db = config.get('mongoURI');

// SET UP FOR MONGOOSE PROMISE TO GLOBAL
// mongoose.Promise = global.Promise

// Mongo connection
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const app = express();

// Middleware
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

// Routes
app.use('/api/management', require('./routes/api/management'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/owner', require('./routes/api/owner'));

// Catch 404 errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

// error handler func
app.use((err, req, res, next) => {

    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    // Response to client
    res.status(status).json({
        error: {
            message: error.message
        }
    })

})

const port = process.env.PORT || 9000;

app.listen(port, () => console.log('Server app started on 9000'));