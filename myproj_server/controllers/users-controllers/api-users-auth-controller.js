const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Role = require("../../models/Role");
const UserAuth = require("../../models/UserAuth");
const UserDetails = require("../../models/UserDetails");
const {
    createError,
    createInternalServerError,
    createUnauthorizedError,
} = require("../../helpers/error-functions");
const HTTP_STATUS_CODES = require("../../helpers/http_status_codes");
const RESULT_CODES = require("../../helpers/result_codes");

const generateAccessToken = (username, email, userDetailsId, roles) => {
    const payload = {
        username,
        email,
        userDetailsId,
        roles,
    };

    return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        const user =
            (await UserAuth.findOne({ email: login })) ||
            (await UserAuth.findOne({ username: login }));

        const createLoginError = () => createError(
            res,
            "Введен не правильный email или пароль",
            HTTP_STATUS_CODES.OK_200,
            { resultCode: RESULT_CODES.BAD_REQUEST }
        )
        if (!user) return createLoginError();
        
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return createLoginError();

        const userDetailsIdString = user.user_details_id.toString();
        const token = generateAccessToken(
            user.username,
            user.email,
            userDetailsIdString,
            user.roles
        );

        
        const userDetails = await UserDetails.findById(userDetailsIdString);
        return res.json({
            token,
            user: {
                username: user.username,
                email: user.email,
                ...userDetails.toObject(),
            },
            resultCode: RESULT_CODES.SUCCESS,
        });
    } catch (error) {
        createInternalServerError(res);
    }
};
const auth = async (req, res) => {
    try {
        const { username, email, userDetailsId } = req.user;
        const userDetails = await UserDetails.findById(userDetailsId);
        if (!userDetails) return createUnauthorizedError(res)

        return res.json({
            user: { username, email, ...userDetails.toObject() },
            resultCode: RESULT_CODES.SUCCESS,
        });
    } catch (error) {
        createInternalServerError(res);
    }
};


const registration = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await UserAuth.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return createError(
                res,
                "Пользователь с таким именем или email уже существует",
                HTTP_STATUS_CODES.OK_200,
                { resultCode: RESULT_CODES.BAD_REQUEST }
            );
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const role = await Role.findOne({ value: "User" });
        const userDetails = new UserDetails();
        await userDetails.save();
        const user = new UserAuth({
            username,
            email,
            user_details_id: userDetails,
            password: hashPassword,
            roles: [role],
        });
        await user.save();
        return res.json({
            message: "Пользователь успешно зарегистрирован",
            resultCode: RESULT_CODES.SUCCESS,
        });
    } catch (error) {
        createInternalServerError(res);
    }
};


module.exports = {
    login,
    registration,
    auth,
};
