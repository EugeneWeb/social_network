const { check } = require("express-validator");
const mongoose = require('mongoose')

const typeNames = {
    Int: 'Int',
    String: 'String',
}

const createMessage = (typeName, options = {}) => {
    let message = `Данное поле должно быть типа ${typeName} и не может быть пустым`;
    
    if (options.min !== undefined && options.max !== undefined) {
        message += `, должно быть не меньше ${options.min} и не больше ${options.max}`;
    } else if (options.min !== undefined) {
        message += `, должно быть не меньше ${options.min}`;
    } else if (options.max !== undefined) {
        message += `, должно быть не больше ${options.max}`;
    }
    message += typeName === typeNames.String ? ' символов': ''

    return message;
};


const checkNotEmptyInt = (fieldName, isIntOptions = {}) => check(
    fieldName,
    createMessage(typeNames.Int, isIntOptions)
)
    .isInt(isIntOptions)
    .notEmpty()

const checkNotEmptyString = (fieldName, MinMaxLengthOptions = {}, message = null) => check(
    fieldName,
    message || createMessage(typeNames.String, MinMaxLengthOptions)
)
    .isString()
    .notEmpty()
    .isLength(MinMaxLengthOptions)

const checkEmptyString = (fieldName, MinMaxLengthOptions = {}) => check(
    fieldName,
    createMessage(typeNames.String, MinMaxLengthOptions)
)
    .isLength(MinMaxLengthOptions)

const checkObjectId = (fieldName) => {
    return check(fieldName).custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error(`Не правильный тип поля ${fieldName}`);
      }
      return true;
    });
  };

module.exports = {
    checkNotEmptyInt,
    checkNotEmptyString,
    checkEmptyString,
    checkObjectId
}