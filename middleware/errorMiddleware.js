
//error handler for 404 errors not found
 const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found -${req.originalUrl}`)
    res.status(404)
    next(error)
}



//customer error-handling middleware
const errorHandler = (err, req, res, next) => {
    //some error status code that comes as 200 we convert to too
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}


export { notFoundHandler, errorHandler }