const { createNotFoundError, createInternalServerError } = require("../helpers/error-functions");


const checkImagePathMiddleware = (req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            next();
        }
    
        const isImagePathCorrect = (imagePath) => {
            const imagePathArray = imagePath.split(".");
            return (
                imagePathArray.length == 2 &&
                ["jpeg", "jpg", "png", "webp", "svg"].includes(imagePathArray[1])
            );
        };
        
        if (!isImagePathCorrect(req.params.path)) {
            return createNotFoundError(res)
        }
        next();
    } catch (error) {
        createInternalServerError(res)
    }
};

module.exports = checkImagePathMiddleware;
