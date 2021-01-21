var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mediumSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    marks:{
        type: Number,
        required: true,
        default:5
    },
    unit:{
        type: Number,
        required: true,
        min:1,
        max:5
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects'
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'teachers'
    }
},{
    timestamps:true
});

var medium = mongoose.model('medium',mediumSchema);
module.exports=medium;
