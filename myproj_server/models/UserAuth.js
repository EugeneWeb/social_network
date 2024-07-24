const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAuthSchema = new Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    user_details_id: { type: Schema.Types.ObjectId, ref: "UserDetails" },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
});

const UserAuth = mongoose.model("UserAuth", userAuthSchema, "user_auth");
module.exports = UserAuth;
