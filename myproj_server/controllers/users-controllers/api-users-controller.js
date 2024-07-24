const {
    createError,
    createInternalServerError,
    createBadRequestError,
    createUnauthorizedError,
    createErrorMessageObject
} = require("../../helpers/error-functions");
const UserDetails = require("../../models/UserDetails");
const RESULT_CODES = require("../../helpers/result_codes");
const HTTP_STATUS_CODES = require("../../helpers/http_status_codes");
const Message = require("../../models/Message");


const getUsers = async (req, res) => {
    try {
        const { page = 1, perPage = 10, term, friend } = req.query;
        const userId = req.user.userDetailsId;

        const findOptions = {
            _id: { $ne: userId },
        };

        if (term) findOptions.fullname = { $regex: new RegExp(term, "ig") };

        if (friend === "show" || friend === "noshow") {
            const currentUser = await UserDetails.findById(userId, { following: 1 });
            if (friend === "show") {
                findOptions._id = { $in: currentUser.following };
            } else {
                findOptions._id = { $nin: [...currentUser.following, userId] };
            }
        } else if (friend) {
            return createBadRequestError(res, createErrorMessageObject("Указано неправильное значение поля friend"));
        }

        const [items, totalCount] = await Promise.all([
            UserDetails.find(findOptions).skip((page - 1) * perPage).limit(perPage),
            UserDetails.countDocuments(findOptions),
        ]);

        res.json({ items, totalCount, resultCode: RESULT_CODES.SUCCESS });
    } catch (error) {
        createInternalServerError(res);
    }
};

const getUser = async (req, res) => {
    try {
        const userDetails = await UserDetails.findById(req.params.id);
        res.json({ user: userDetails, resultCode: RESULT_CODES.SUCCESS });
    } catch (error) {
        createInternalServerError(res);
    }
};


const addToUserChats = async (req, res) => {
    try {
        const userId = req.user.userDetailsId;
        const chatsId = req.params.id
        const currentUser = await UserDetails.findById(userId)
        
        
        let alreadyExist = currentUser.chats.some(id => id.toString() == chatsId)
        
        if(alreadyExist) return createBadRequestError(res)

        currentUser.chats.push(chatsId)
        await currentUser.save()

        const user = await UserDetails.findById(chatsId)

        alreadyExist = user.chats.some(id => id.toString() == currentUser._id)
        if(alreadyExist) return createBadRequestError(res)
        user.chats.push(currentUser._id)
        await user.save()
        res.json({user, resultCode: RESULT_CODES.SUCCESS });
    } catch (error) {
        createInternalServerError(res);
    }
}
const getUserChats = async (req, res) => {
    try {
        const userId = req.user.userDetailsId;
        const currentUser = await UserDetails.findById(userId, {chats: true}).populate('chats')

        res.json({chats: currentUser.chats, resultCode: RESULT_CODES.SUCCESS });
    } catch (error) {
        createInternalServerError(res);
    }
}

const getUsersMessages = async (req, res) => {
    try {
        const sender = req.query.senderId;
        const recipient = req.query.recipientId;
        const ourMessages = await Message.find({to_userId: recipient, from_userId: sender})
        const otherMessages = await Message.find({to_userId: sender, from_userId: recipient})
        const messages = [...ourMessages, ...otherMessages]
        const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt);
        res.json({messages: sortedMessages, resultCode: RESULT_CODES.SUCCESS });
    } catch (error) {
        createInternalServerError(res);
    }
}

const sendMessage = async (req, res) => {
    try {
        const userId = req.user.userDetailsId;
        const recipient = req.params.id;
        const {message} = req.body
        const newMessage = new Message({to_userId: recipient, from_userId: userId, message})
        await newMessage.save()

        res.json({message: newMessage,resultCode: RESULT_CODES.SUCCESS });
    } catch (error) {
        createInternalServerError(res);
    }
}




const updatePatchCurrentUser = async (req, res) => {
    try {
        const {
            fullname,
            email,
            status,
            photoUrl,
            backgroundUrl,
            location: { city, country } = {},
            desc: { birthday, education } = {}
        } = req.body;

        const updateFields = {
            ...(fullname && { fullname }),
            ...(status && { status }),
            ...(photoUrl && { photoUrl }),
            ...(backgroundUrl && { backgroundUrl }),
            ...(city && { 'location.city': city }),
            ...(country && { 'location.country': country }),
            ...(birthday && { 'desc.birthday': birthday }),
            ...(education && { 'desc.education': education })
        };

        const userDetails = await UserDetails.findByIdAndUpdate(
            req.user.userDetailsId,
            { $set: updateFields }
        );
        res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT_204);
    } catch (error) {
        createInternalServerError(res);
    }
};

// const updatePatchUser = async (req, res) => {
//     try {
//         const {
//             fullname,
//             status,
//             photoUrl,
//             backgroundUrl,
//             location: { city, country } = {},
//             desc: { birthday, education } = {}
//         } = req.body;

//         const updateFields = {
//             ...(fullname && { fullname }),
//             ...(status && { status }),
//             ...(photoUrl && { photoUrl }),
//             ...(backgroundUrl && { backgroundUrl }),
//             ...(city && { 'location.city': city }),
//             ...(country && { 'location.country': country }),
//             ...(birthday && { 'desc.birthday': birthday }),
//             ...(education && { 'desc.education': education })
//         };

//         const userDetails = await UserDetails.findByIdAndUpdate(
//             req.user.userDetailsId,
//             { $set: updateFields }
//         );
//         res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT_204);
//     } catch (error) {
//         createInternalServerError(res);
//     }
// };

// // Не корректно работает, удаляет только userDetails
const deleteUser = async (req, res) => {
    try {

        const userDetails = await UserDetails.findByIdAndDelete(req.params.id);
        res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT_204);
    } catch (error) {
        createInternalServerError(res);
    }
};


const followUnfollowFlow = async (req, res, userId, pullOrAddOperation) => { 
    try {

        const hasFollowingUser = await UserDetails.findById(userId);
        if (!hasFollowingUser) {
            return createError(res, "Пользователя с таким id не существует");
        }

        const userDetails = await UserDetails.findByIdAndUpdate(
            req.user.userDetailsId,
            { [pullOrAddOperation]: { following: userId } }
        );

        res.json({ resultCode: RESULT_CODES.SUCCESS });
    } catch (error) {
        createInternalServerError(res);
    }
}

const unfollow = async (req, res) => {
   followUnfollowFlow(req, res, req.params.id, '$pull')
};

const follow = async (req, res) => {
    followUnfollowFlow(req, res, req.params.id, '$addToSet')
};

const updateStatus = async (req, res) => {
    try {
        const { userDetailsId } = req.user;
        const { status } = req.body;

        const userDetails = await UserDetails.findByIdAndUpdate(
            userDetailsId,
            { status }
        );

        res.json({
            message: "Статус успешно обновлён",
            resultCode: RESULT_CODES.SUCCESS,
        });
    } catch (error) {
        createUnauthorizedError(res);
    }
};

module.exports = {
    getUsers,
    getUser,
    updatePatchCurrentUser,
    follow,
    unfollow,
    updateStatus,
    deleteUser,
    addToUserChats,
    getUserChats,
    getUsersMessages,
    sendMessage,

};
