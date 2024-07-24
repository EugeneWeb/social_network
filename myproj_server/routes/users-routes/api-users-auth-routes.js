const express = require("express");

const authMiddleware = require("../../middlewares/authMiddleware");
const {
    auth,
    login,
    registration,
} = require("../../controllers/users-controllers/api-users-auth-controller");
const { checkNotEmptyString } = require("../../helpers/express-validators");
const addExpressValidatorMiddleware = require("../../middlewares/addExpressValidatorMiddleware");

const router = express.Router();

const checkPassword = () => checkNotEmptyString(
    "password",
    { min: 8, max: 20 }
);
const checkEmailLogin = (fieldName) => checkNotEmptyString(
    fieldName,
    { max: 319 }
);

router.post(
    "/login",
    [
        checkEmailLogin('login'),
        checkPassword(),
        addExpressValidatorMiddleware,
    ],
    login
);
router.post(
    "/registration",
    [
        checkNotEmptyString(
            "username",
            { max: 64 }
        ),
        checkEmailLogin('email'),
        checkPassword(),
        addExpressValidatorMiddleware,
    ],
    registration
);
router.post("/auth", authMiddleware, auth);

module.exports = router;
