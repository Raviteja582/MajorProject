const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    marks:{
        type: Number,
        min: 2,
        max: 20,
        required: true
    },
    diffculty:{
        type: String,
        required: true
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    unit:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
},{
    timestamps: true
});

var question = mongoose.model('question',questionSchema);
module.exports=question
