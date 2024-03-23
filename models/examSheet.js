const mongoose = require('mongoose')
const { Schema } = mongoose

const examSheetSchema = new Schema({
  
    examId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    updatedOn: {
        type: Date,
        default: new Date(),
      },
   
},{ strict: false })

module.exports = mongoose.model('examSheet', examSheetSchema,'examSheet')
