module.exports = isEmpty = (field) => {
    if(
        field === 'undefined' ||
        field === null ||
        (typeof field === 'object' && Object.keys(field).length === 0) ||
        (typeof field === 'String' && field.trim().length === 0)
        )
        {
            return true
        }
}