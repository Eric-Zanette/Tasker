const Validator = require('validator')
const isEmpty = require('./isEmpty')

validateLoginInput = (data) => {
    let errors = {}

    data.email = isEmpty(data.email) ? data.email : ''
    data.password = isEmpty(data.password) ? data.password : ''

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Not a valid email!'
    }

    if(data.email.length === 0) {
        errors.email = 'Email is required'
    }

    if(data.password.length === 0) {
        errors.email = 'Password is required'
        
    }

    return{
        errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    } 
}

validateRegistrationInput = (data) => {
    let errors = {}

    data.email = isEmpty(data.email) ? data.email : ''
    data.password = isEmpty(data.password) ? data.password : ''
    data.password2 = isEmpty(data.password2) ? data.password2 : ''
    data.username = isEmpty(data.username) ? data.username : ''


    if(!Validator.isLength(data.username.toString(), {min:2, max: 15})) {
        errors.username = 'Username must be between 2 and 15 characters'
    }

    if(data.username.length === 0 || !username) {
        errors.username = 'Username is required'
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Not a valid email!'
    }

    if(data.email.length === 0) {
        errors.email = 'Email is required'
    }

    if(data.password.length === 0) {
        errors.password = 'Password is required'     
    }

    if(data.password2 != data.password1) {
        errors.password2 = 'passwords must match'     
    }

    if(!data.password2) {
        errors.password2 = 'Must repeat password'     
    }

    return{
        errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    } 
}

module.exports = {
    validateLoginInput,
    validateRegistrationInput
}