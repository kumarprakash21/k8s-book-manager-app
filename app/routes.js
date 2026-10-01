var path = require('path');
var Book = require('./model');

function sendError(res, err) {
    if (err && (err.name === 'ValidationError' || err.name === 'CastError')) {
        return res.status(400).json({ message: 'Please enter valid book details.' });
    }
    if (err && err.code === 11000) {
        return res.status(409).json({ message: 'A book with this ISBN already exists.' });
    }
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
}

module.exports = function(app) {
    app.get('/book', async function(req, res) {
        try { res.json(await Book.find({}).sort({ createdAt: -1 })); }
        catch (err) { sendError(res, err); }
    });

    app.post('/book', async function(req, res) {
        try { res.status(201).json(await new Book(req.body).save()); }
        catch (err) { sendError(res, err); }
    });

    app.put('/book/:isbn', async function(req, res) {
        try {
            var result = await Book.findOneAndUpdate(
                { isbn: req.params.isbn }, req.body,
                { new: true, runValidators: true }
            );
            if (!result) return res.status(404).json({ message: 'Book not found.' });
            res.json(result);
        } catch (err) { sendError(res, err); }
    });

    app.delete('/book/:isbn', async function(req, res) {
        try {
            var result = await Book.findOneAndDelete({ isbn: req.params.isbn });
            if (!result) return res.status(404).json({ message: 'Book not found.' });
            res.status(204).end();
        } catch (err) { sendError(res, err); }
    });

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};
