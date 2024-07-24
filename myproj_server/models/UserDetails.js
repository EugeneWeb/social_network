const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userDetailsSchema = new Schema({
    fullname: {
        type: String,
        default: 'Не указано'
    },
    location: {
        city: {
            type: String,
            default: 'Не указано'
        },
        country: {
            type: String,
            default: 'Не указано'
        }
    },
    status: {
        type: String,
        default: 'Статус не задан'
    },
    photoUrl: {
        type: String,
        default: 'http://localhost:5000/api/user/avatar/avatar1.svg'
    },
    backgroundUrl: {
        type: String,
        default: 'http://localhost:5000/api/user/background/bg1.webp'
    },
    following: [{type: Schema.Types.ObjectId, ref: 'UserDetails'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'UserDetails'}],
    posts_id: [{ type: Schema.Types.ObjectId, ref: 'UserPosts'}],
    news_id: [{ type: Schema.Types.ObjectId, ref: 'UserNews'}],
    exercises_id: [{ type: Schema.Types.ObjectId, ref: 'UserExercises'}],
    desc: {
        birthday: {
            type: String,
            default: 'Не указано'
        },
        education: {
            type: String,
            default: 'Не указано'
        }
    },
    chats: [{type: Schema.Types.ObjectId, ref: 'UserDetails'}]
})

const UserDetails = mongoose.model('UserDetails', userDetailsSchema, 'user_details')
module.exports = UserDetails