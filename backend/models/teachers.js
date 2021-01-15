const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
    department:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'department'
    },
    dob:{
        type: Date
        required: true
    },
    phno:{
        type: String,
        required: true
    }
},{
    timestamps: true
}
);

var teacher = mongoose.model('teacher',teacherSchema);
module.exports = teacher
