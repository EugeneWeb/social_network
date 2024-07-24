const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserAuth = require("../../models/UserAuth");
const UserDetails = require("../../models/UserDetails");
const {
    createError,
} = require("../../helpers/error-functions");
const UserPosts = require("../../models/UserPosts");
const RESULT_CODES = require("../../helpers/result_codes");
const { default: mongoose } = require("mongoose");

const getPosts = async (req, res) => {
    try {
        const userDetails = await UserDetails.findById(req.params.id, {
            posts_id: 1,
        });
        const findOptions = {
            _id: { $in: userDetails.toObject().posts_id },
        }
        const [items, totalCount] = await Promise.all([
            UserPosts.find(findOptions),
            UserPosts.countDocuments(findOptions),
        ]);
        return res.json({ resultCode: RESULT_CODES.SUCCESS, items, totalCount });
    } catch (error) {
        console.log(error);
        createError(res, "Посты не были найдены", 400);
    }
};
const getCurrentUserPosts = async (req, res) => {
    try {
        const userDetails = await UserDetails.findById(req.user.userDetailsId, {
            posts_id: 1,
        });
        const findOptions = {
            _id: { $in: userDetails.toObject().posts_id },
        }
        const [items, totalCount] = await Promise.all([
            UserPosts.find(findOptions),
            UserPosts.countDocuments(findOptions),
        ]);
        return res.json({ resultCode: RESULT_CODES.SUCCESS, items, totalCount });
    } catch (error) {
        console.log(error);
        createError(res, "Посты не были найдены", 400);
    }
};
const addPost = async (req, res) => {
    try {
        const { text } = req.body;
        if (text?.length === 0) {
            return createError(
                res,
                "Пост с такими данными не может быть создан",
                200,
                { resultCode: 1 }
            );
        }
        const post = {
            text,
        };
        const { userDetailsId } = req.user;

        const newPost = new UserPosts(post);
        await newPost.save();

        await UserDetails.updateOne(
            { _id: userDetailsId },
            { $push: { posts_id: newPost.id } }
        );

        return res.json({
            message: "Пост успешно добавлен",
            post: newPost,
            info: { resultCode: 0 },
        });
    } catch (error) {
        console.log(error);
        createError(res, "Пост не был добавлен", 400);
    }
};
const deletePost = async (req, res) => {
    try {
        const { userDetailsId } = req.user;

        await UserDetails.updateOne(
            { _id: userDetailsId },
            { $pull: { posts_id: req.params.id } }
        );
        await UserPosts.findByIdAndDelete(req.params.id);

        return res.json({
            message: "Пост был успешно удален",
            info: { resultCode: 0 },
        });
    } catch (error) {
        console.log(error);
        createError(res, "Пост не был удален", 400);
    }
};
const togglePostLikesCount = async (req, res) => {
    try {
        const { username } = req.user;
        const userAuth = await UserAuth.findOne({ username });

        const post = await UserPosts.findOne(
            { _id: req.params.id },
            { usersLiked: 1 }
        );
        const isLiked = post.usersLiked.some(
            (elem) => elem._id.toString() === userAuth._id.toString()
        );
        if (isLiked) {
            await UserPosts.findByIdAndUpdate(req.params.id, {
                $inc: { likesCount: -1 },
            });
            await UserPosts.findByIdAndUpdate(req.params.id, {
                $pull: { usersLiked: userAuth.id },
            });
        } else {
            await UserPosts.findByIdAndUpdate(req.params.id, {
                $inc: { likesCount: +1 },
            });
            await UserPosts.findByIdAndUpdate(req.params.id, {
                $push: { usersLiked: userAuth.id },
            });
        }
        

        return res.json({
            message: "Поле likesCount было успешно изменено",
            resultCode: 0
        });
    } catch (error) {
        console.log(error);
        createError(res, "Поле likesCount не было изменено", 400);
    }
};
const getPostLikesCount = async (req, res) => {
    try {
        const post = await UserPosts.findOne(
            { _id: req.params.id },
            { likesCount: 1 }
        );

        return res.json({
            likesCount:post.likesCount,
            resultCode: 0
        });
    } catch (error) {
        console.log(error);
        createError(res, "Поле likesCount не было изменено", 400);
    }
};



module.exports = {
    addPost,
    getPosts,
    deletePost,
    togglePostLikesCount,
    getPostLikesCount,
    getCurrentUserPosts
};
