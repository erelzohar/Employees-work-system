const mongoose = require ("mongoose");

const EmployeeSchema = mongoose.Schema({
    
    fullName:{
        type:String,
        required:[true,"Missing name."],
        minlength:[2,"The selected name is too short"],
        maxlength:[25,"The selected name is too long"]
    },

    totalHours:{
        type:Number,
    },

    totalSessions:{
        type:Number
    },

    role:{
        type:String
    },

    phoneNumber:{
        type:String,
        minlength:[10,"Phone number length is 10 numbers"],
        maxlength:[10,"Phone number length is 10 numbers"],
        required:[true,"Missing phone number"]
    },

    password:{
        type:String,
        required:[true,"Missing password"],
        minlength:[6,"Password is min 6 charaters"]
    },

    isWorking:{
        type:Boolean
    },
    token: {
        type: String,
        required: false
    }
},{ versionKey: false, toJSON: { virtuals: true }, id: false });

const EmployeeModel = mongoose.model("EmployeeModel",EmployeeSchema,"users")

module.exports = EmployeeModel;