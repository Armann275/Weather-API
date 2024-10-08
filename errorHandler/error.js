const errobj = {
    400:"Bad Request"
}

function errorHandler(err,req,res,next) {
    if (errobj[err.status]) {
        return res.status(err.status).json(errobj[err.status]);
    }
    return res.status(500).json('Internal Server Error');
}
module.exports = {errorHandler};
