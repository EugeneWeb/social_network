const HTTP_status_codes = require("./http_status_codes")
const HTTP_STATUS_MESSAGES = require("./http_status_messages")

const createError = (res, message, status = HTTP_status_codes.BAD_REQUEST_400, info ={}) => {
    return res.status(status).json({message, info})
}
const createErrorMessageObject = (message) => ({
    errorMsg: message
})
const createInternalServerError = (res, errors = {}) => {
    createError(res, HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR_500, HTTP_status_codes.INTERNAL_SERVER_ERROR_500, errors)
}
const createUnauthorizedError = (res) => {
    createError(res, HTTP_STATUS_MESSAGES.UNAUTHORIZED_401, HTTP_status_codes.UNAUTHORIZED_401)
}
const createBadRequestError = (res, errors = {}) => {
    createError(res, HTTP_STATUS_MESSAGES.BAD_REQUEST_400, HTTP_status_codes.BAD_REQUEST_400, errors)
}
const createNotFoundError = (res) => {
    createError(res, HTTP_STATUS_MESSAGES.NOT_FOUND_404, HTTP_status_codes.NOT_FOUND_404)
}
const createForbiddenError = (res) => {
    createForbiddenError(res, HTTP_STATUS_MESSAGES.FORBIDDEN_403, HTTP_STATUS_MESSAGES.FORBIDDEN_403)
}

module.exports = {
    createError,
    createInternalServerError,
    createUnauthorizedError,
    createBadRequestError,
    createNotFoundError,
    createForbiddenError,
    createErrorMessageObject
}