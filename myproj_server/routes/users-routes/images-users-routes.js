const express = require("express");
const {
    sendAvatar,
    sendBackground,
} = require("../../controllers/images-users-controller");
const checkImagePathMiddleware = require("../../middlewares/checkImagePathMiddleware");
const router = express.Router();

router.get("/avatar/:path", [checkImagePathMiddleware], sendAvatar);
router.get("/background/:path", [checkImagePathMiddleware], sendBackground);

module.exports = router;
