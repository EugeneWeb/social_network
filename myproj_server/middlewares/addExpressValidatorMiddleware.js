const { validationResult } = require("express-validator");
const { createBadRequestError, createInternalServerError } = require("../helpers/error-functions");


const addExpressValidatorMiddleware = (req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            next();
        }
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return createBadRequestError(res, { errors: errors.array() });
        }
        next();
    } catch (error) {
        createInternalServerError(res)
    }
};

module.exports = addExpressValidatorMiddleware;
