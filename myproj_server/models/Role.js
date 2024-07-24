const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
    value: {type: String, unique: true, required:true, default: 'User'}
})

const Role = mongoose.model('Role', roleSchema)
module.exports = Role