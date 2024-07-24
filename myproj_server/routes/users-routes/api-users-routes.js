const express = require("express");

const authMiddleware = require("../../middlewares/authMiddleware");
const {
    getUser,
    getUsers,
    follow,
    unfollow,
    updateStatus,
    updatePatchCurrentUser,
    deleteUser,
    addToUserChats,
    getUserChats,
    getUsersMessages,
    sendMessage,
} = require("../../controllers/users-controllers/api-users-controller");
const {
    checkNotEmptyInt,
    checkNotEmptyString,
    checkEmptyString,
    checkObjectId,
} = require("../../helpers/express-validators");
const addExpressValidatorMiddleware = require("../../middlewares/addExpressValidatorMiddleware");
const { check } = require("express-validator");

const router = express.Router();


router.get("/messages", authMiddleware, getUsersMessages);
router.get("/chats", authMiddleware, getUserChats);
router.get(
    "/",
    [
        authMiddleware,
        checkNotEmptyInt("page"),
        checkNotEmptyInt("perPage"),
        checkEmptyString("term", { min: 0, max: 64 }),
        checkEmptyString("friend", { min: 0, max: 64 }),
        addExpressValidatorMiddleware,
    ],
    getUsers
);
router.put(
    "/status",
    [
        authMiddleware,
        checkNotEmptyString("status"),
        addExpressValidatorMiddleware,
    ],
    updateStatus
);

router.get(
    "/:id",
    [authMiddleware, checkObjectId("id"), addExpressValidatorMiddleware],
    getUser
);

// сделать ограничения для всех полей, что-то типа checkUserFields
// тут не должен быть id, изменяем сами себя через authMiddleware
router.patch(
    "/",
    [
        authMiddleware,
        checkEmptyString("fullname", { min: 0, max: 64 }),
        checkEmptyString("status", { min: 0, max: 128 }),
        checkEmptyString("photoUrl", { min: 0, max: 2048 }),
        checkEmptyString("backgroundUrl", { min: 0, max: 2048 }),
        checkEmptyString("location.city", { min: 0, max: 256 }),
        checkEmptyString("location.country", { min: 0, max: 128 }),
        check("desc.birthday").custom((value) => {
            // Проверяем, является ли значение датой в формате DD.MM.YYYY
            const regex = /^\d{2}\.\d{2}\.\d{4}$/;
            if (value && !regex.test(value)) {
                throw new Error("Дата должна быть в формате DD.MM.YYYY");
            }
            return true;
        }),
        addExpressValidatorMiddleware,
    ],
    updatePatchCurrentUser
);

// router.patch("/:id", [
//     authMiddleware,
//     checkObjectId('id'),
//     checkEmptyString("fullname", { min: 0, max: 64 }),
//     checkEmptyString("status", { min: 0, max: 128 }),
//     checkEmptyString("photoUrl", { min: 0, max: 2048 }),
//     checkEmptyString("backgroundUrl", { min: 0, max: 2048 }),
//     checkEmptyString("location.city", { min: 0, max: 256 }),
//     checkEmptyString("location.country", { min: 0, max: 128 }),
//     check('desc.birthday').custom(value => {
//         // Проверяем, является ли значение датой в формате DD.MM.YYYY
//         const regex = /^\d{2}\.\d{2}\.\d{4}$/;
//         if (value && !regex.test(value)) {
//           throw new Error('Дата должна быть в формате DD.MM.YYYY');
//         }
//         return true;
//     }),
//     addExpressValidatorMiddleware
// ], updatePatchUser);
router.post(
    "/follow/:id",
    [authMiddleware, checkObjectId("id"), addExpressValidatorMiddleware],
    follow
);
router.delete(
    "/unfollow/:id",
    [authMiddleware, checkObjectId("id"), addExpressValidatorMiddleware],
    unfollow
);
router.delete(
    "/:id",
    [authMiddleware, checkObjectId("id"), addExpressValidatorMiddleware],
    deleteUser
);



router.patch(
    "/chats/:id",
    [authMiddleware, checkObjectId("id"), addExpressValidatorMiddleware],
    addToUserChats
);

router.post("/messages/:id", authMiddleware, sendMessage);


module.exports = router;
