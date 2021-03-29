var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var easySchema = new Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true,
    },
    questions: {
        u1: [
            {
                name: {
                    type: String,
                    required: true,

                },
                teacher: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'teacher',
                    required: true,
                }
            }
        ],
        u2: [
            {
                name: {
                    type: String,
                    required: true,

                },
                teacher: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'teacher',
                    required: true,
                }
            }
        ],
        u3: [
            {
                name: {
                    type: String,
                    required: true,

                },
                teacher: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'teacher',
                    required: true,
                }
            }
        ],
        u4: [
            {
                name: {
                    type: String,
                    required: true,

                },
                teacher: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'teacher',
                    required: true,
                }
            }
        ],
        u5: [
            {
                name: {
                    type: String,
                    required: true,

                },
                teacher: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'teacher',
                    required: true,
                }
            }
        ],
    },

}, {
    timestamps: true
});

var easy = mongoose.model('easy', easySchema);
module.exports = easy;
