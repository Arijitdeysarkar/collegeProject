const express = require('express')
const router = express.Router()
const passport = require('passport')

const { adminLogin, addFaculty, addStudent,
    addSubject, getAllFaculty, getAllStudents, getAllSubjects,
    addAdmin, 
    getAllStudent,
    getAllSubject,
    addExam,
    getAllExam,
    getFeesByExamId} = require('../controller/adminController')

router.post('/login', adminLogin)
router.post('/addAdmin', addAdmin )
router.post('/getAllFaculty',getAllFaculty)
router.post('/getAllStudent', getAllStudent)
router.post('/getAllSubject', getAllSubject)
router.post('/addFaculty', addFaculty)
router.get('/getFaculties', getAllFaculty)
router.post('/addStudent',addStudent)
router.get('/getStudents', getAllStudents)
router.post('/addSubject', addSubject)
router.get('/getSubjects',getAllSubjects)
router.post('/addExam', addExam)
router.get('/getAllExam',getAllExam)
router.post('/addExam', addExam)
router.post('/getFeesByExamId', getFeesByExamId)



module.exports = router