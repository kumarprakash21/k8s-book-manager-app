var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    isbn: { type: String, required: true, trim: true, unique: true, maxlength: 32 },
    author: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    pages: { type: Number, required: true, min: 1, max: 100000 }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);