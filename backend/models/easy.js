var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var easySchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    marks:{
        type: Number,
        required: true,
        default:2
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

var easy = mongoose.model('easy',easySchema);
module.exports=easy;
