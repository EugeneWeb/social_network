const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    message: {type: String, required:true},
    from_userId: {type: Schema.Types.ObjectId, ref: 'UserDetails', required: true},
    to_userId: {type: Schema.Types.ObjectId, ref: 'UserDetails', required: true},
}, {timestamps: true})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message