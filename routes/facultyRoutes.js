const express = require('express')
const passport = require('passport')
const upload = require('../utils/multer')

const router = express.Router()

const { fetchStudents, markAttendence, facultyLogin, getAllSubjects,
    updatePassword, forgotPassword, postOTP, uploadMarks, updateProfile, facultySignup } = require('../controller/facultyController')

router.post('/login', facultyLogin)
router.post('/signup', facultySignup)


router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

router.post('/updateProfile',  upload.single("avatar") ,updateProfile)

router.post('/fetchStudents',  fetchStudents)

router.post('/fetchAllSubjects',  getAllSubjects)

router.post('/markAttendence',  markAttendence)

router.post('/uploadMarks', uploadMarks)

router.post('/updatePassword',  updatePassword)

module.exports = router
