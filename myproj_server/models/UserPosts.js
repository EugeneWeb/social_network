const {model, Schema} = require('mongoose')

const userPostsSchema = new Schema({
    text: {type: String, required: true},
    likesCount: {type: Number, default: 0},
    usersLiked: [{type: Schema.Types.ObjectId, ref: 'UserAuth'}]
}, {timestamps: true})

const UserPosts = model('UserPosts', userPostsSchema, 'user_posts')
module.exports = UserPosts