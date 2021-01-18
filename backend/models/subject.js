const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'department'
    },
},{
    timestamps: true
});

var subject = mongoose.model('subject',subjectSchema);
module.exports = subject
