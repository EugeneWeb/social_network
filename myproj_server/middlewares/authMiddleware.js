const { createUnauthorizedError, createForbiddenError, createInternalServerError, createErrorMessageObject } = require("../helpers/error-functions");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            next();
        }

        const token = req.headers.authorization;
        if (!token) {
            return createUnauthorizedError(res)
        }

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return createForbiddenError(res)
            }
            req.user = user;
            next();
        });
    } catch (error) {
        createInternalServerError(res, createErrorMessageObject("Данный токен не действителен"))
    }
};

module.exports = authMiddleware
