class ErrorHander extends Error{
    constructor(message,statusCode){
    //    super is this class cunstructor
        super(message)
        this.statusCode = statusCode
//  Error  methos capturestacktrace
        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = ErrorHander