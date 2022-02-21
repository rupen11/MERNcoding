const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    title: { type: String, require: true },
    subtitle: { type: String, require: true },
    description: { type: String, require: true },
});

const Note = new mongoose.model("notes", NoteSchema);

module.exports = Note;