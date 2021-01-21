var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var hardSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    marks:{
        type: Number,
        required: true,
        default:10
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

var hard = mongoose.model('hard',hardSchema);
module.exports=hard;
