const Validator = require('validator')
const isEmpty = require('./isEmpty')

validateTaskInput = (data) => {
    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : ''
    data.finishBy = !isEmpty(data.finishBy) ? data.finishBy : ''
    data.description = !isEmpty(data.description) ? data.description : ''

    if(!Validator.isLength(data.description.toString(), {min:0, max: 100})) {
        errors.username = 'Description must be under 100 characters'
    }

    if(Validator.isEmpty(data.title)) {
        errors.title = 'Task Title is required'
    }

    if(new Date(data.finishBy) < (new Date())) {
        errors.finishBy = 'Completion date must be in the future!'
    }

    if(Validator.isEmpty(data.finishBy)) {
        errors.finishBy = 'Must Include A completion Date!'
    }

    return{
        errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    } 
}

module.exports = validateTaskInput