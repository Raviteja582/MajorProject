const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
      name:{
          type: String,
          required: true,
      },
      year:{
          type: Number,
          required: true,
      },
      semester:{
          type: Number,
          required: true
      }
},{
    timestamps: true
});

var department = mongoose.model('department',departmentSchema);

module.exports = department
