const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookModel = new Schema({
    comedian:  {
        type: Schema.Types.ObjectId, 
        required: true, 
        unique: true
    },
    books: [
        {
            bookerId: {type: Schema.Types.ObjectId, required: true, unique: true}, 
            workType: {type: String, required: true}, 
            description: {type: String, required: true}
        }
    ]
})

module.exports = mongoose.model('Book', bookModel);