const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

const teacherSchema = new Schema({
    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type: String,
        default:''
    },
    email:{
        type: String,
        default:'',
        unique: true
    },
    dob:{
        type: String,
        default:''
    },
    phno:{
        type: String,
        default:''
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
