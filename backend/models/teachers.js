const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

const teacherSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    phno:{
        type: String,
        default:''
    },
    isauth:{
        type: Boolean,
        default: false
    },
    admin:{
        type: Boolean,
        default: false 
    }
},{
    timestamps: true
}
);

teacherSchema.plugin(passportLocalMongoose); 

var teacher = mongoose.model('teacher',teacherSchema);
module.exports = teacher
