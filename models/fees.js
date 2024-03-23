const mongoose = require('mongoose')
const { Schema } = mongoose

const feesSchema = new Schema({
    exam: {
        type: String,
        required: true
    },
    examId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
    },
    updatedOn: {
        type: Date,
        default: new Date(),
      },
   
},{ strict: false })

module.exports = mongoose.model('fees', feesSchema,'fees')
