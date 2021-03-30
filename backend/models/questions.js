var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var questionSchema = new Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true,
    },
    easy: {
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
    medium: {
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
    hard: {
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

var question = mongoose.model('question', questionSchema);
module.exports = question;
