const { createUnauthorizedError, createForbiddenError, createInternalServerError } = require("../helpers/error-functions");
const jwt = require("jsonwebtoken");

const roleMiddleware = (roles) => {
    return function (req, res, next) {
        try {
            if (req.method === "OPTIONS") {
                next();
            }

            const token = req.headers.authorization;
            if (!token) {
                return createUnauthorizedError(res)
            }

            const { roles: userRoles } = jwt.verify(token, process.env.SECRET);
            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return createForbiddenError(res)
            }

            next();
        } catch (error) {
            createInternalServerError(res)
        }
    };
};

module.exports = roleMiddleware
