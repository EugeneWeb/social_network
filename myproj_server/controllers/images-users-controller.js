const path = require("path");
const {createInternalServerError} = require("../helpers/error-functions");



const sendAvatarBackgroundFlow = (res, folderName, image) => {
    try {
        res.sendFile(
            path.join(__dirname, "..", "images", folderName, image),
            (error) => {
                if (error) {
                    createInternalServerError(res)
                }
            }
        );
    } catch (error) {
        createInternalServerError(res)
    }
};

const sendAvatar = (req, res) => {
    sendAvatarBackgroundFlow(res, "avatars", req.params.path);
};
const sendBackground = (req, res) => {
    sendAvatarBackgroundFlow(res, "backgrounds", req.params.path);
};

module.exports = {
    sendAvatar,
    sendBackground,
};
