const mongoose = require('mongoose')
const { Schema } = mongoose

const exammSchema = new Schema({
    exam: {
        type: String,
        required: true,
        defult: null,
    },
    fees: {
        type: Number,
        required: true,
        defult: null,
    },
    date: {
        type: Date,
        default: new Date(),
    }
   
},{ strict: false })

module.exports = mongoose.model('exam', exammSchema,'exams')
