const mongoose = require('mongoose'),
      mongoosastic = require('mongoosastic'),
      getElasticInstance = require("../esSetup");

let userSchema = mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    first_name:{
        type: String
    },
    last_name: {
        type: String
    },
    company_name: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: Number
    },
    email: {
        type: String
    },
    web:{
        type: String
    },
    age: {
        type: Number
    }
},{
    timestamps: true
});

userSchema.plugin(mongoosastic, {
    esClient: getElasticInstance.getElasticInstance()
  });


let userModel = mongoose.model('users', userSchema, 'users')
module.exports = userModel